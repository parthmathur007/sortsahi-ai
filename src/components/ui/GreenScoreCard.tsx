"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf, ChevronRight } from "lucide-react";
import { loadScore } from "@/lib/scoring";
import type { GreenScore } from "@/types";

interface GreenScoreCardProps {
  compact?: boolean;
}

export function GreenScoreCard({ compact = false }: GreenScoreCardProps) {
  const [score, setScore] = useState<GreenScore | null>(null);

  useEffect(() => {
    setScore(loadScore());
    // Listen for score updates from other components
    const handler = () => setScore(loadScore());
    window.addEventListener("sortsahi:score-update", handler);
    return () => window.removeEventListener("sortsahi:score-update", handler);
  }, []);

  if (!score) return null;

  const { totalPoints, level } = score;
  const nextPts = level.nextLevelPoints;
  const ptsToNext = nextPts ? nextPts - totalPoints : 0;

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
        <Leaf className="w-4 h-4 text-green-600 shrink-0" />
        <div className="min-w-0">
          <div className="text-xs text-green-600 font-medium truncate">{level.name}</div>
          <div className="text-sm font-bold text-green-800">{totalPoints} pts</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{level.name}</h3>
            <p className="text-sm text-gray-500">Level {level.level} of 5</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-700">{totalPoints}</div>
          <div className="text-xs text-gray-500">GreenPoints</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{level.minPoints} pts</span>
          {nextPts && <span>{nextPts} pts</span>}
        </div>
        <div
          className="h-2.5 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={level.progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress to next level: ${level.progressPercent}%`}
        >
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
            style={{ width: `${level.progressPercent}%` }}
          />
        </div>
        {nextPts && (
          <p className="text-xs text-gray-500 mt-1">{ptsToNext} pts to next level</p>
        )}
        {!nextPts && (
          <p className="text-xs text-green-600 mt-1 font-medium">🌍 Maximum level reached!</p>
        )}
      </div>

      <p className="text-sm text-gray-600 italic">{level.encouragingMessage}</p>

      <Link
        href="/history"
        className="mt-3 flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
      >
        View full progress <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
