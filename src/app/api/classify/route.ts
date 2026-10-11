import { NextRequest, NextResponse } from "next/server";
import { createProvider } from "@/lib/ai/provider";
import { classifyFromText } from "@/lib/classification";

import type {
  AIIdentificationResult,
  ClassificationResult,
  WasteStream,
} from "@/types";

export const runtime = "nodejs";
export const maxDuration = 35;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const VALID_STREAMS: WasteStream[] = [
  "wet",
  "dry",
  "sanitary",
  "special",
];

type CompatibleAIResult = AIIdentificationResult & {
  category?: string;
  reasoning?: string;
  preparationSteps?: string[];
  reuseSuggestions?: string[];
  safetyWarnings?: string[];
  source?: string;
};

function toResult(
  ai: AIIdentificationResult,
  isDemo: boolean,
): ClassificationResult {
  const result = ai as CompatibleAIResult;

  /*
   * Support both response formats:
   *
   * Original provider:
   * candidateStream, shortExplanation
   *
   * Alternative provider:
   * category, reasoning
   */

  const rawStream =
    result.candidateStream ??
    result.category;

  const normalizedStream =
    typeof rawStream === "string"
      ? rawStream.toLowerCase()
      : "";

  const validStream = VALID_STREAMS.find(
    (stream) => stream === normalizedStream,
  );

  const confidence = result.confidence;

  const canConfirm =
    (confidence === "high" ||
      confidence === "medium") &&
    validStream !== undefined;

  const explanation =
    result.shortExplanation ??
    result.reasoning ??
    result.missingInfo?.[0] ??
    "The item could not be identified confidently.";

  const disposalInstructions =
    result.disposalInstructions?.length
      ? result.disposalInstructions
      : [
          "Keep the item separate until you confirm the appropriate local disposal route.",
        ];

  return {
    itemName:
      result.likelyItem?.trim() || "Unknown item",

    stream: canConfirm ? validStream : null,

    confidence,

    shortExplanation: explanation,

    disposalInstructions,

    preparationTips:
      result.preparationTips ??
      result.preparationSteps ??
      [],

    isDemo,

    isDeterministic: isDemo,

    source:
      result.sourceNote ??
      result.source,

    warnings: [
      ...(result.missingInfo ?? []),
      ...(result.safetyWarnings ?? []),
    ],
  };
}

function errorResponse(
  message: string,
  status: number,
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status },
  );
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return errorResponse(
        "The request body is invalid. Please try again.",
        400,
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return errorResponse(
        "Provide a valid classification request.",
        400,
      );
    }

    const payload = body as {
      query?: unknown;
      imageBase64?: unknown;
      mimeType?: unknown;
    };

    const provider = createProvider();

    /*
     * TEXT CLASSIFICATION
     */

    if (
      typeof payload.query === "string" &&
      payload.imageBase64 === undefined
    ) {
      const query = payload.query.trim();

      if (!query) {
        return errorResponse(
          "Enter an item name to classify.",
          400,
        );
      }

      if (query.length > 200) {
        return errorResponse(
          "Item descriptions must be 200 characters or fewer.",
          400,
        );
      }

      if (!provider.isDemo) {
        /*
         * Always call the configured live AI provider.
         * Do not replace live classification with a knowledge-base match.
         */

        const aiResult =
          await provider.identifyFromText(query);

        return NextResponse.json({
          success: true,
          result: toResult(aiResult, false),
          aiMode: "live",
        });
      }

      /*
       * Explicit demo mode only.
       */

      const demoResult =
        await provider.identifyFromText(query);

      if (demoResult.confidence !== "unknown") {
        return NextResponse.json({
          success: true,
          result: toResult(demoResult, true),
          aiMode: "demo",
        });
      }

      const knowledgeResult = classifyFromText(query);

      return NextResponse.json({
        success: true,
        result: knowledgeResult,
        aiMode: "demo",
      });
    }

    /*
     * IMAGE CLASSIFICATION
     */

    if (
      typeof payload.imageBase64 === "string" &&
      typeof payload.mimeType === "string"
    ) {
      const imageBase64 = payload.imageBase64;
      const mimeType = payload.mimeType.toLowerCase();

      if (!ALLOWED_TYPES.includes(mimeType)) {
        return errorResponse(
          "Unsupported image type. Use JPEG, PNG, or WebP.",
          400,
        );
      }

      const cleanedBase64 = imageBase64
        .replace(/^data:[^;]+;base64,/, "")
        .trim();

      if (!cleanedBase64) {
        return errorResponse(
          "The image is empty. Please upload it again.",
          400,
        );
      }

      if (
        !/^[A-Za-z0-9+/]+={0,2}$/.test(cleanedBase64) ||
        cleanedBase64.length % 4 === 1
      ) {
        return errorResponse(
          "Invalid image data. Please select the image again.",
          400,
        );
      }

      const estimatedBytes =
        Math.floor((cleanedBase64.length * 3) / 4) -
        (cleanedBase64.endsWith("==")
          ? 2
          : cleanedBase64.endsWith("=")
            ? 1
            : 0);

      if (estimatedBytes > MAX_IMAGE_SIZE) {
        return errorResponse(
          "Image too large. Maximum size is 5 MB.",
          400,
        );
      }

      /*
       * Pass the actual uploaded image to the configured provider.
       */

      const aiResult =
        await provider.identifyFromImage(
          cleanedBase64,
          mimeType,
        );

      return NextResponse.json({
        success: true,
        result: toResult(
          aiResult,
          provider.isDemo,
        ),
        aiMode: provider.isDemo ? "demo" : "live",
      });
    }

    return errorResponse(
      "Provide either a text query or an image with its MIME type.",
      400,
    );
  } catch (error) {
    console.error("[API /classify]", error);

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected classification error occurred.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 502 },
    );
  }
}