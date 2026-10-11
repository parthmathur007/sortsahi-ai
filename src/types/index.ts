// ============================================================
// SortSahi AI — Core Types
// ============================================================

export type WasteStream = "wet" | "dry" | "sanitary" | "special";

export type ConfidenceLevel = "high" | "medium" | "low" | "unknown";

// ------ Classification Knowledge Base ------

export interface WasteItem {
  id: string;
  name: string;                   // primary display name
  aliases: string[];              // alternate names / search terms
  stream: WasteStream;
  shortExplanation: string;       // 1–2 sentences why this stream
  disposalInstructions: string[]; // ordered list of practical steps
  preparationTips?: string[];     // e.g. "remove food residue before recycling"
  conditionalRules?: ConditionalRule[]; // ask follow-up if condition applies
  tags: string[];                 // searchable tags
  examples?: string[];            // concrete examples of this item type
  source?: string;                // reference / authority
}

export interface ConditionalRule {
  condition: string;              // human-readable condition
  question: string;               // follow-up question to ask user
  options: ConditionalOption[];
}

export interface ConditionalOption {
  label: string;
  stream: WasteStream;
  explanation: string;
  disposalInstructions: string[];
}

// ------ Classification Result ------

export interface ClassificationResult {
  itemName: string;
  stream: WasteStream | null;
  confidence: ConfidenceLevel;
  shortExplanation: string;
  disposalInstructions: string[];
  preparationTips: string[];
  conditionalQuestion?: {
    question: string;
    options: ConditionalOption[];
  };
  isDemo: boolean;                // true when no live AI key
  isDeterministic: boolean;       // true when from knowledge base (not AI free-form)
  source?: string;
  warnings?: string[];            // e.g. "Cannot identify from image alone — check label"
}

// ------ AI Provider Interface ------

export interface AIIdentificationResult {
  likelyItem: string;
  visualEvidence: string[];
  candidateStream?: WasteStream;
  confidence: ConfidenceLevel;
  missingInfo?: string[];
  rawResponse?: string;
  shortExplanation?: string;
  disposalInstructions?: string[];
  preparationTips?: string[];
  sourceNote?: string;
}

export interface AIProvider {
  name: string;
  isDemo: boolean;
  identifyFromImage(base64Image: string, mimeType: string): Promise<AIIdentificationResult>;
  identifyFromText(itemDescription: string): Promise<AIIdentificationResult>;
}

// ------ GreenScore & Levels ------

export type AchievementId =
  | "intro_quiz"
  | "daily_challenge"
  | "quiz_pass"
  | "learning_activity"
  | "weekly_challenge";

export interface PointEvent {
  id: string;
  achievementId: AchievementId;
  points: number;
  timestamp: string;       // ISO 8601
  label: string;
  date: string;            // YYYY-MM-DD — used for daily dedup
}

export interface GreenScore {
  totalPoints: number;
  level: GreenLevel;
  events: PointEvent[];
  claimedToday: Record<string, string[]>; // date → list of achievementIds
}

export interface GreenLevel {
  level: number;
  name: string;
  minPoints: number;
  nextLevelPoints: number | null;
  progressPercent: number;
  encouragingMessage: string;
}

// ------ Daily Challenge ------

export interface ChallengeQuestion {
  id: string;
  questionText: string;
  options: ChallengeOption[];
  correctOptionId: string;
  explanation: string;
  tip?: string;
  source?: string;
  tags: string[];
}

export interface ChallengeOption {
  id: string;
  text: string;
  stream?: WasteStream;
}

export interface ChallengeResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  date: string; // YYYY-MM-DD
}

// ------ Learning History ------

export interface LearningEntry {
  id: string;
  type: "challenge" | "quiz" | "learning" | "classification";
  label: string;
  date: string;        // YYYY-MM-DD
  timestamp: string;   // ISO 8601
  correct?: boolean;
  pointsEarned: number;
  category?: WasteStream;
}

// ------ UI State ------

export type UploadState = "idle" | "loading" | "success" | "error";

export interface ClassificationState {
  status: UploadState;
  result: ClassificationResult | null;
  error: string | null;
  imagePreview: string | null;
  pendingConditional: {
    result: ClassificationResult;
    options: ConditionalOption[];
    question: string;
  } | null;
}
