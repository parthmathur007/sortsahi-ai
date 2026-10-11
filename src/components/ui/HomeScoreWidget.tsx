"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf, ChevronRight } from "lucide-react";
import { loadScore } from "@/lib/scoring";
import type { GreenScore } from "@/types";

export function HomeScoreWidget() {
  const [score, setScore] = useState<GreenScore | null>(null);

  useEffect(() => {
    setScore(loadScore());
  }, []);

  if (!score) return null;

  const { totalPoints, level } = score;
  const nextPts = level.nextLevelPoints;
  const ptsToNext = nextPts ? nextPts - totalPoints : 0;

  return (
    <Link
      href="/history"
      className="block rounded-3xl border border-[#d9e5d3] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md group sm:p-6"
      aria-label={`Your GreenScore: ${totalPoints} points. Level: ${level.name}. View progress.`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Your GreenScore</p>
            <p className="text-xl font-extrabold leading-tight text-green-800">{totalPoints} pts</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">{level.name}</p>
          <p className="text-sm text-gray-500">Level {level.level} of 5</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 ml-2" />
      </div>

      {nextPts && (
        <div className="mt-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${level.progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{ptsToNext} pts to {level.level < 5 ? "next level" : "max"}</p>
        </div>
      )}
    </Link>
  );
}
