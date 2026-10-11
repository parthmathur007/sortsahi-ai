import type {
  AIProvider,
  AIIdentificationResult,
  WasteStream,
} from "@/types";

import { searchKnowledgeBase } from "@/lib/classification";

const STREAMS = [
  "wet",
  "dry",
  "sanitary",
  "special",
  "unknown",
] as const;

const CONFIDENCE_LEVELS = [
  "high",
  "medium",
  "low",
  "unknown",
] as const;

type ConfidenceLevel = AIIdentificationResult["confidence"];

interface GeminiPart {
  text?: string;
  inline_data?: {
    mime_type: string;
    data: string;
  };
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
    status?: string;
  };
}

interface GeminiRequest {
  contents: Array<{
    role: "user";
    parts: GeminiPart[];
  }>;
  generationConfig: {
    temperature: number;
    maxOutputTokens: number;
    responseMimeType: "application/json";
    responseSchema: Record<string, unknown>;
  };
}

const RESULT_SCHEMA: Record<string, unknown> = {
  type: "OBJECT",
  properties: {
    likelyItem: {
      type: "STRING",
      description: "The specific item identified.",
    },
    category: {
      type: "STRING",
      enum: [...STREAMS],
      description: "The appropriate waste category.",
    },
    reasoning: {
      type: "STRING",
      description: "Explain why this category is appropriate.",
    },
    visualEvidence: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Visible evidence supporting identification.",
    },
    confidence: {
      type: "STRING",
      enum: [...CONFIDENCE_LEVELS],
      description: "Confidence in the identification.",
    },
    preparationSteps: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Steps to prepare the item for disposal.",
    },
    disposalInstructions: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Practical disposal instructions.",
    },
    reuseSuggestions: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Repair, reuse, or donation options.",
    },
    safetyWarnings: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Relevant safety warnings.",
    },
    missingInfo: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Additional information needed.",
    },
  },
  required: [
    "likelyItem",
    "category",
    "reasoning",
    "visualEvidence",
    "confidence",
    "preparationSteps",
    "disposalInstructions",
    "reuseSuggestions",
    "safetyWarnings",
    "missingInfo",
  ],
};

const SYSTEM_INSTRUCTIONS = `
You are SortSahi AI, a careful waste identification assistant.

Identify the item from the user's description or uploaded image.

Return only JSON matching the provided schema.

Categories:
- wet: food scraps and biodegradable waste accepted locally.
- dry: recyclable or non-biodegradable household waste.
- sanitary: diapers, sanitary pads and similar sanitary waste.
- special: batteries, e-waste, bulbs, chemicals, medicines, sharps
  and other waste requiring special handling.
- unknown: insufficient evidence for safe classification.

Rules:
1. Analyze each input independently.
2. Do not assume all plastics are recyclable.
3. Local recycling and municipal disposal rules vary.
4. Never classify hazardous waste as ordinary dry waste when
   special handling is appropriate.
5. For shoes, prioritize repair, reuse and donation.
6. Never invent local collection facilities or schedules.
7. For images, describe only characteristics that are visible.
8. If uncertain, lower confidence and explain what is missing.
9. Give practical preparation and disposal guidance.
10. Do not claim 100% certainty.
11. Return every required field.
`;

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCategory(
  value: unknown,
): WasteStream | "unknown" {
  if (typeof value === "string") {
    const normalized = value.toLowerCase();

    if (
      (STREAMS as readonly string[]).includes(normalized)
    ) {
      return normalized as WasteStream | "unknown";
    }
  }

  return "unknown";
}

function normalizeConfidence(
  value: unknown,
): ConfidenceLevel {
  if (typeof value === "string") {
    const normalized = value.toLowerCase();

    if (
      (CONFIDENCE_LEVELS as readonly string[]).includes(
        normalized,
      )
    ) {
      return normalized as ConfidenceLevel;
    }
  }

  return "unknown";
}

function parseModelJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  return JSON.parse(cleaned) as unknown;
}

function validateResult(
  value: unknown,
): AIIdentificationResult {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    throw new Error("Gemini returned an invalid result.");
  }

  const result = value as Record<string, unknown>;

  return {
    likelyItem: asString(
      result.likelyItem,
      "Unknown item",
    ),
    category: normalizeCategory(result.category),
    reasoning: asString(
      result.reasoning,
      "There is not enough information to identify this item confidently.",
    ),
    visualEvidence: asStringArray(result.visualEvidence),
    confidence: normalizeConfidence(result.confidence),
    preparationSteps: asStringArray(
      result.preparationSteps,
    ),
    disposalInstructions: asStringArray(
      result.disposalInstructions,
    ),
    reuseSuggestions: asStringArray(
      result.reuseSuggestions,
    ),
    safetyWarnings: asStringArray(
      result.safetyWarnings,
    ),
    missingInfo: asStringArray(result.missingInfo),
  } as AIIdentificationResult;
}

function getGeminiConfiguration(): {
  apiKey: string;
  model: string;
} | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  const model =
    process.env.GEMINI_MODEL?.trim() ||
    "gemini-2.5-flash";

  if (!apiKey) {
    return null;
  }

  return { apiKey, model };
}

async function callGemini(
  parts: GeminiPart[],
): Promise<AIIdentificationResult> {
  const configuration = getGeminiConfiguration();

  if (!configuration) {
    throw new Error(
      "Gemini API key is missing. Add GEMINI_API_KEY to .env.local.",
    );
  }

  const { apiKey, model } = configuration;

  const requestBody: GeminiRequest = {
    contents: [
      {
        role: "user",
        parts: [
          { text: SYSTEM_INSTRUCTIONS },
          ...parts,
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1200,
      responseMimeType: "application/json",
      responseSchema: RESULT_SCHEMA,
    },
  };

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    `${encodeURIComponent(model)}:generateContent` +
    `?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });

  const data = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ||
        `Gemini request failed with HTTP ${response.status}.`,
    );
  }

  const generatedText = data.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!generatedText) {
    throw new Error(
      "Gemini returned no usable response. Please try again.",
    );
  }

  let parsed: unknown;

  try {
    parsed = parseModelJson(generatedText);
  } catch {
    throw new Error(
      "Gemini returned invalid JSON. Please retry.",
    );
  }

  return validateResult(parsed);
}

export class DemoProvider implements AIProvider {
  name = "Demo";
  isDemo = true;

  async identifyFromImage(): Promise<AIIdentificationResult> {
    return {
      likelyItem: "Image identification unavailable",
      category: "unknown",
      reasoning:
        "Demo mode cannot analyze uploaded images. Configure Gemini to enable live image identification.",
      visualEvidence: [],
      confidence: "unknown",
      preparationSteps: [],
      disposalInstructions: [
        "Check local waste segregation guidelines before disposal.",
      ],
      reuseSuggestions: [],
      safetyWarnings: [],
      missingInfo: [
        "Configure GEMINI_API_KEY to enable live image identification.",
      ],
    } as AIIdentificationResult;
  }

  async identifyFromText(
    description: string,
  ): Promise<AIIdentificationResult> {
    const cleaned = description.trim();

    if (!cleaned) {
      throw new Error("Please enter an item description.");
    }

    const match = searchKnowledgeBase(cleaned);

    if (!match) {
      return {
        likelyItem: "Unknown item",
        category: "unknown",
        reasoning:
          "Demo mode could not find a sufficiently relevant knowledge-base match.",
        visualEvidence: [],
        confidence: "unknown",
        preparationSteps: [],
        disposalInstructions: [
          "Check local waste segregation guidelines before disposal.",
        ],
        reuseSuggestions: [],
        safetyWarnings: [],
        missingInfo: [
          "Configure Gemini to enable live AI identification.",
        ],
      } as AIIdentificationResult;
    }

    return {
      likelyItem: match.name,
      category: match.stream,
      reasoning: match.shortExplanation,
      visualEvidence: [],
      confidence: "low",
      preparationSteps: match.preparationTips ?? [],
      disposalInstructions:
        match.disposalInstructions ?? [],
      reuseSuggestions: [],
      safetyWarnings: [],
      missingInfo: [
        "This result came from the demo knowledge base, not live AI.",
      ],
    } as AIIdentificationResult;
  }
}

export class GeminiProvider implements AIProvider {
  name = "Gemini";
  isDemo = false;

  async identifyFromText(
    description: string,
  ): Promise<AIIdentificationResult> {
    const cleaned = description.trim();

    if (!cleaned) {
      throw new Error("Please enter an item description.");
    }

    return callGemini([
      {
        text:
          "Identify this waste item from the following description. " +
          "Analyze this input independently:\n\n" +
          cleaned,
      },
    ]);
  }

  async identifyFromImage(
    base64Image: string,
    mimeType: string,
  ): Promise<AIIdentificationResult> {
    const cleanedImage = base64Image
      .replace(/^data:[^;]+;base64,/, "")
      .trim();

    if (!cleanedImage) {
      throw new Error("The uploaded image is empty.");
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (
      !allowedMimeTypes.includes(mimeType.toLowerCase())
    ) {
      throw new Error(
        "Unsupported image format. Use JPEG, PNG, WebP, HEIC, or HEIF.",
      );
    }

    return callGemini([
      {
        text:
          "Identify the waste item visible in this actual image. " +
          "Describe visible evidence and provide cautious disposal guidance.",
      },
      {
        inline_data: {
          mime_type: mimeType,
          data: cleanedImage,
        },
      },
    ]);
  }
}

/**
 * Uses Gemini when configured; otherwise uses demo mode.
 */
export function createProvider(): AIProvider {
  if (getGeminiConfiguration()) {
    return new GeminiProvider();
  }

  return new DemoProvider();
}