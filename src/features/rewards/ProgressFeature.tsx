"use client";

import { useEffect, useState } from "react";
import { Leaf, Trophy, Calendar, TrendingUp } from "lucide-react";
import { loadScore, LEVEL_CONFIG, POINTS } from "@/lib/scoring";
import type { GreenScore } from "@/types";

export function ProgressFeature() {
  const [score, setScore] = useState<GreenScore | null>(null);

  useEffect(() => {
    setScore(loadScore());
    const handler = () => setScore(loadScore());
    window.addEventListener("sortsahi:score-update", handler);
    return () => window.removeEventListener("sortsahi:score-update", handler);
  }, []);

  if (!score) return null;

  const { totalPoints, level, events } = score;
  const nextPts = level.nextLevelPoints;
  const ptsToNext = nextPts ? nextPts - totalPoints : 0;

  return (
    <div className="space-y-5">
      {/* Score card */}
      <div className="card bg-gradient-to-br from-green-600 to-emerald-700 text-white border-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-green-100 text-sm">GreenLevel {level.level} of 5</p>
              <h2 className="text-lg font-bold">{level.name}</h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold">{totalPoints}</div>
            <div className="text-green-200 text-xs">GreenPoints</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-1">
          <div className="flex justify-between text-xs text-green-200 mb-1.5">
            <span>{level.minPoints} pts</span>
            {nextPts && <span>{nextPts} pts</span>}
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${level.progressPercent}%` }}
            />
          </div>
        </div>
        {nextPts ? (
          <p className="text-xs text-green-200">{ptsToNext} pts to {LEVEL_CONFIG[level.level]?.name}</p>
        ) : (
          <p className="text-xs text-white font-medium">🌍 Maximum level achieved!</p>
        )}

        <p className="mt-3 text-sm text-green-100 italic">{level.encouragingMessage}</p>
      </div>

      {/* Level roadmap */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          Level Roadmap
        </h3>
        <div className="space-y-3">
          {LEVEL_CONFIG.map((lc) => {
            const isUnlocked = totalPoints >= lc.minPoints;
            const isCurrent = lc.level === level.level;
            return (
              <div
                key={lc.level}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? "border-green-400 bg-green-50"
                    : isUnlocked
                    ? "border-green-200 bg-green-50/50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    isUnlocked ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {lc.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isUnlocked ? "text-green-800" : "text-gray-500"}`}>
                    {lc.name}
                  </p>
                  <p className="text-xs text-gray-400">{lc.minPoints} pts required</p>
                </div>
                {isCurrent && (
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium shrink-0">
                    Current
                  </span>
                )}
                {isUnlocked && !isCurrent && (
                  <span className="text-xs text-green-600">✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Points breakdown */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          How to Earn Points
        </h3>
        <div className="space-y-2">
          {[
            { label: "Daily Challenge (correct answer)", pts: POINTS.DAILY_CHALLENGE, icon: "📅" },
            { label: "Intro Quiz completion", pts: POINTS.INTRO_QUIZ, icon: "🎯" },
            { label: "5-Question Quiz (4+ correct)", pts: POINTS.QUIZ_PASS, icon: "📝" },
            { label: "Learning Activity", pts: POINTS.LEARNING_ACTIVITY, icon: "📚" },
            { label: "Weekly Challenge", pts: POINTS.WEEKLY_CHALLENGE, icon: "🏆" },
          ].map(({ label, pts, icon }) => (
            <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className="text-base w-6 text-center">{icon}</span>
              <span className="text-sm text-gray-700 flex-1">{label}</span>
              <span className="text-sm font-bold text-green-700">+{pts} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          Recent Activity
        </h3>
        {events.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No activity yet. Complete the daily challenge to earn your first GreenPoints!
          </div>
        ) : (
          <div className="space-y-2">
            {events.slice(0, 10).map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{ev.label}</p>
                  <p className="text-xs text-gray-400">{ev.date}</p>
                </div>
                <span className="text-sm font-bold text-green-600">+{ev.points}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
