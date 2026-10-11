/**
 * SortSahi AI — Scoring Engine
 *
 * All point values are named constants.
 * Level thresholds are configurable.
 * Duplicate-reward prevention uses date-keyed dedup.
 */

import type {
  GreenScore,
  GreenLevel,
  AchievementId,
  PointEvent,
} from "@/types";

// ─────────────────────────────────────────────────────────────
// Point Constants
// ─────────────────────────────────────────────────────────────

export const POINTS = {
  INTRO_QUIZ: 20,
  DAILY_CHALLENGE: 10,
  QUIZ_PASS: 25,         // 4/5 or better on a 5-question quiz
  LEARNING_ACTIVITY: 15,
  WEEKLY_CHALLENGE: 30,
} as const satisfies Record<string, number>;

// ─────────────────────────────────────────────────────────────
// Level Configuration (configurable)
// ─────────────────────────────────────────────────────────────

interface LevelConfigEntry {
  level: number;
  name: string;
  minPoints: number;
  encouragingMessage: string;
}

export const LEVEL_CONFIG: LevelConfigEntry[] = [
  {
    level: 1,
    name: "Green Beginner",
    minPoints: 0,
    encouragingMessage: "Welcome to SortSahi! Every correct sort makes a difference. 🌱",
  },
  {
    level: 2,
    name: "Waste Explorer",
    minPoints: 100,
    encouragingMessage: "You're learning fast! Keep exploring waste segregation. 🔍",
  },
  {
    level: 3,
    name: "Segregation Pro",
    minPoints: 300,
    encouragingMessage: "Impressive! You know your bins better than most. ♻️",
  },
  {
    level: 4,
    name: "Eco Champion",
    minPoints: 600,
    encouragingMessage: "You're an eco champion — inspiring others to sort right! 🏆",
  },
  {
    level: 5,
    name: "Planet Protector",
    minPoints: 1000,
    encouragingMessage: "Planet Protector status achieved! You're a waste-sorting legend. 🌍",
  },
];

export type LevelNumber = 1 | 2 | 3 | 4 | 5;

// ─────────────────────────────────────────────────────────────
// Level Calculation
// ─────────────────────────────────────────────────────────────

export function calculateLevel(totalPoints: number): GreenLevel {
  let currentConfig = LEVEL_CONFIG[0];

  for (const config of LEVEL_CONFIG) {
    if (totalPoints >= config.minPoints) {
      currentConfig = config;
    } else {
      break;
    }
  }

  const isMaxLevel = currentConfig.level === LEVEL_CONFIG[LEVEL_CONFIG.length - 1].level;
  const nextConfig = isMaxLevel
    ? null
    : LEVEL_CONFIG[currentConfig.level]; // level is 1-based, array is 0-based

  const nextLevelPoints = nextConfig?.minPoints ?? null;

  let progressPercent = 100;
  if (nextConfig) {
    const pointsInThisLevel = totalPoints - currentConfig.minPoints;
    const pointsNeeded = nextConfig.minPoints - currentConfig.minPoints;
    progressPercent = Math.min(100, Math.round((pointsInThisLevel / pointsNeeded) * 100));
  }

  return {
    level: currentConfig.level,
    name: currentConfig.name,
    minPoints: currentConfig.minPoints,
    nextLevelPoints,
    progressPercent,
    encouragingMessage: currentConfig.encouragingMessage,
  };
}

// ─────────────────────────────────────────────────────────────
// Today's date string
// ─────────────────────────────────────────────────────────────

export function todayString(): string {
  const now = new Date();
  // Use the user's local calendar date so daily rewards do not roll over at UTC midnight.
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ─────────────────────────────────────────────────────────────
// Default empty score
// ─────────────────────────────────────────────────────────────

export function emptyScore(): GreenScore {
  return {
    totalPoints: 0,
    level: calculateLevel(0),
    events: [],
    claimedToday: {},
  };
}

// ─────────────────────────────────────────────────────────────
// Add Points — with duplicate prevention
// ─────────────────────────────────────────────────────────────

export interface AddPointsResult {
  newScore: GreenScore;
  pointsAdded: number;
  leveledUp: boolean;
  newLevel: GreenLevel | null;
  alreadyClaimed: boolean;
}

export function addPoints(
  score: GreenScore,
  achievementId: AchievementId,
  points: number,
  label: string,
  /** If true, the reward can only be claimed once per calendar day */
  dailyLimited = true
): AddPointsResult {
  const today = todayString();
  const claimedToday = score.claimedToday ?? {};
  const todayClaimed = claimedToday[today] ?? [];

  if (dailyLimited && todayClaimed.includes(achievementId)) {
    return {
      newScore: score,
      pointsAdded: 0,
      leveledUp: false,
      newLevel: null,
      alreadyClaimed: true,
    };
  }

  const oldLevel = calculateLevel(score.totalPoints);
  const newTotal = score.totalPoints + points;
  const newLevel = calculateLevel(newTotal);
  const leveledUp = newLevel.level > oldLevel.level;

  const event: PointEvent = {
    id: `${achievementId}-${Date.now()}`,
    achievementId,
    points,
    timestamp: new Date().toISOString(),
    label,
    date: today,
  };

  const updatedClaimedToday = {
    ...claimedToday,
    [today]: [...todayClaimed, achievementId],
  };

  const newScore: GreenScore = {
    totalPoints: newTotal,
    level: newLevel,
    events: [event, ...score.events].slice(0, 50), // keep last 50 events
    claimedToday: updatedClaimedToday,
  };

  return {
    newScore,
    pointsAdded: points,
    leveledUp,
    newLevel: leveledUp ? newLevel : null,
    alreadyClaimed: false,
  };
}

// ─────────────────────────────────────────────────────────────
// Check if achievement already claimed today
// ─────────────────────────────────────────────────────────────

export function hasClaimedToday(score: GreenScore, achievementId: AchievementId): boolean {
  const today = todayString();
  const todayClaimed = score.claimedToday?.[today] ?? [];
  return todayClaimed.includes(achievementId);
}

// ─────────────────────────────────────────────────────────────
// localStorage helpers (client-side only)
// ─────────────────────────────────────────────────────────────

const SCORE_KEY = "sortsahi_score";

export function loadScore(): GreenScore {
  if (typeof window === "undefined") return emptyScore();
  try {
    const raw = localStorage.getItem(SCORE_KEY);
    if (!raw) return emptyScore();
    const parsed = JSON.parse(raw) as GreenScore;
    // Recalculate level in case config changed
    parsed.level = calculateLevel(parsed.totalPoints);
    return parsed;
  } catch {
    return emptyScore();
  }
}

export function saveScore(score: GreenScore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(score));
  } catch {
    // localStorage may be unavailable (private browsing, quota)
    console.warn("SortSahi: Could not save score to localStorage.");
  }
}
