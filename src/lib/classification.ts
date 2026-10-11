/**
 * SortSahi AI — Classification Engine
 *
 * Two layers:
 * 1. Text search → knowledge base lookup → deterministic result
 * 2. AI identification → knowledge base lookup → deterministic guidance
 *
 * The knowledge base is the authority on disposal guidance.
 * AI / freeform text only identifies the item — it does not generate disposal rules.
 */

import type {
  ClassificationResult,
  WasteItem,
  WasteStream,
} from "@/types";
import {
  WASTE_KNOWLEDGE_BASE,
  getSearchIndex,
  findItemById,
} from "@/lib/data/wasteKnowledge";

// ─────────────────────────────────────────────────────────────
// Stream display metadata
// ─────────────────────────────────────────────────────────────

export const STREAM_META: Record<
  WasteStream,
  { label: string; color: string; bg: string; border: string; icon: string; description: string }
> = {
  wet: {
    label: "Wet Waste",
    color: "text-green-800",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "🟢",
    description: "Biodegradable organic material — kitchen scraps, garden waste. Goes in the GREEN bin.",
  },
  dry: {
    label: "Dry Waste",
    color: "text-blue-800",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "🔵",
    description: "Recyclable materials — paper, plastic, metal, glass. Goes in the BLUE bin.",
  },
  sanitary: {
    label: "Sanitary Waste",
    color: "text-purple-800",
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "🟣",
    description: "Hygiene and sanitary products — pads, diapers, used tissues. Goes in the RED/BLACK bin.",
  },
  special: {
    label: "Special-Care Waste",
    color: "text-red-800",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "🔴",
    description: "Hazardous items — batteries, e-waste, medicines, chemicals. Requires special disposal.",
  },
};

// ─────────────────────────────────────────────────────────────
// Fuzzy search in knowledge base
// ─────────────────────────────────────────────────────────────

export function searchKnowledgeBase(query: string): WasteItem | null {
  if (!query || query.trim().length === 0) return null;

  const normalise = (value: string) => value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const normalised = normalise(query);
  const index = getSearchIndex();

  // Exact item names and aliases always win. This prevents short queries such as
  // "pen" from matching unrelated words like "open" or unrelated categories.
  const exact = index.find((entry) => normalise(entry.keyword) === normalised);
  if (exact) return findItemById(exact.itemId) ?? null;

  // Permit a query such as "used banana peel" to match a known phrase, but only
  // when all words in the indexed phrase occur as whole words in the query.
  const contained = index
    .filter((entry) => {
      const keyword = normalise(entry.keyword);
      return keyword.length >= 4 && (` ${normalised} `).includes(` ${keyword} `);
    })
    .sort((a, b) => normalise(b.keyword).length - normalise(a.keyword).length);
  if (contained.length > 0) return findItemById(contained[0].itemId) ?? null;

  // Conservative token overlap: ignore generic one/two-character fragments and
  // avoid substring scoring. If the query is ambiguous, return null rather than
  // displaying confidently wrong disposal guidance.
  const queryTokens = new Set(normalised.split(" ").filter((token) => token.length >= 3));
  if (queryTokens.size === 0) return null;
  const scores = new Map<string, number>();
  for (const entry of index) {
    const keywordTokens = new Set(normalise(entry.keyword).split(" ").filter((token) => token.length >= 3));
    let score = 0;
    keywordTokens.forEach((token) => {
      if (queryTokens.has(token)) score += token.length >= 5 ? 3 : 1;
    });
    if (score > 0) scores.set(entry.itemId, Math.max(scores.get(entry.itemId) ?? 0, score));
  }
  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  if (!ranked.length || ranked[0][1] < 3) return null;
  if (ranked.length > 1 && ranked[0][1] === ranked[1][1]) return null;
  return findItemById(ranked[0][0]) ?? null;
}

// ─────────────────────────────────────────────────────────────
// Build ClassificationResult from a WasteItem
// ─────────────────────────────────────────────────────────────

export function buildResult(item: WasteItem, isDemo = false): ClassificationResult {
  const hasConditional =
    item.conditionalRules && item.conditionalRules.length > 0;

  const result: ClassificationResult = {
    itemName: item.name,
    stream: item.stream,
    confidence: "high",
    shortExplanation: item.shortExplanation,
    disposalInstructions: item.disposalInstructions,
    preparationTips: item.preparationTips ?? [],
    isDemo,
    isDeterministic: true,
    source: item.source,
  };

  if (hasConditional) {
    const rule = item.conditionalRules![0];
    result.conditionalQuestion = {
      question: rule.question,
      options: rule.options,
    };
    // When there's a conditional, don't display instructions yet
    result.stream = null;
    result.confidence = "medium";
    result.disposalInstructions = [];
    result.shortExplanation =
      item.shortExplanation +
      " However, the correct bin depends on a bit more information.";
  }

  return result;
}

// ─────────────────────────────────────────────────────────────
// Primary classification from text query
// ─────────────────────────────────────────────────────────────

export function classifyFromText(query: string): ClassificationResult {
  const item = searchKnowledgeBase(query);

  if (!item) {
    return {
      itemName: query,
      stream: null,
      confidence: "unknown",
      shortExplanation:
        "We could not identify this item in our knowledge base. Please try describing the item differently, or check with your local municipal waste authority.",
      disposalInstructions: [
        "Do not guess the bin if the material or item is unclear.",
        "Add the material, condition, or a clearer item name and try again.",
        "For batteries, chemicals, medicines, or electronic items, keep them separate and check an approved local collection route.",
      ],
      preparationTips: [],
      isDemo: false,
      isDeterministic: true,
      warnings: [
        "Item not found in knowledge base. Consider checking with your local municipal authority.",
      ],
    };
  }

  return buildResult(item, false);
}

// ─────────────────────────────────────────────────────────────
// Classification from AI-identified item name
// ─────────────────────────────────────────────────────────────

export function classifyFromAIIdentification(
  aiItemName: string,
  isDemo: boolean
): ClassificationResult {
  // Try to match AI's identified item name in our knowledge base
  const item = searchKnowledgeBase(aiItemName);

  if (!item) {
    return {
      itemName: aiItemName,
      stream: null,
      confidence: "low",
      shortExplanation: `The item was identified as "${aiItemName}" but we could not find specific disposal guidance in our knowledge base.`,
      disposalInstructions: [
        "The item is not yet matched to a reviewed disposal rule, so do not treat this as a confirmed classification.",
        "Try a more specific name or describe the material and condition.",
        "For potentially hazardous items, keep them separate and check an approved local collection route.",
      ],
      preparationTips: [],
      isDemo,
      isDeterministic: false,
      warnings: [
        "Disposal guidance for this specific item is not yet in our knowledge base. The AI identified the item but guidance is approximate.",
      ],
    };
  }

  const result = buildResult(item, isDemo);
  return result;
}

// ─────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────

export function getStreamMeta(stream: WasteStream) {
  return STREAM_META[stream];
}

export function getAllCategories(): { stream: WasteStream; count: number }[] {
  const counts = new Map<WasteStream, number>();
  for (const item of WASTE_KNOWLEDGE_BASE) {
    counts.set(item.stream, (counts.get(item.stream) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([stream, count]) => ({ stream, count }));
}

export function getSampleItems(stream: WasteStream, limit = 4): WasteItem[] {
  return WASTE_KNOWLEDGE_BASE.filter((i) => i.stream === stream).slice(0, limit);
}
