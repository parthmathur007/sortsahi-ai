"use client";

import { useState, useEffect } from "react";
import { Trophy, CheckCircle, XCircle, Info, Calendar, Lightbulb, Lock } from "lucide-react";
import { getDailyChallenge } from "@/lib/data/questions";
import { loadScore, saveScore, addPoints, hasClaimedToday, POINTS } from "@/lib/scoring";
import type { ChallengeQuestion, GreenScore } from "@/types";
import { WasteStreamBadge } from "@/components/ui/WasteStreamBadge";

export function DailyChallengeFeature() {
  const [question, setQuestion] = useState<ChallengeQuestion | null>(null);
  const [score, setScore] = useState<GreenScore | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    const refreshForToday = () => {
      const q = getDailyChallenge();
      const s = loadScore();
      setQuestion(q);
      setScore(s);
      setSelectedId(null);
      setSubmitted(false);
      setPointsEarned(0);
      setAlreadyDone(hasClaimedToday(s, "daily_challenge"));
    };
    refreshForToday();
    // Also refresh if the page is left open across local midnight.
    const timer = window.setInterval(() => {
      const todayKey = new Date().toLocaleDateString("en-CA");
      if (document.documentElement.dataset.sortsahiDay !== todayKey) {
        document.documentElement.dataset.sortsahiDay = todayKey;
        refreshForToday();
      }
    }, 30_000);
    document.documentElement.dataset.sortsahiDay = new Date().toLocaleDateString("en-CA");
    return () => window.clearInterval(timer);
  }, []);

  if (!question || !score) return null;

  const isCorrect = selectedId === question.correctOptionId;

  const handleSubmit = () => {
    if (!selectedId || submitted) return;
    setSubmitted(true);

    if (isCorrect) {
      const { newScore, pointsAdded } = addPoints(
        score,
        "daily_challenge",
        POINTS.DAILY_CHALLENGE,
        "Daily Challenge Correct Answer",
        true
      );
      setScore(newScore);
      setPointsEarned(pointsAdded);
      saveScore(newScore);
      // Notify GreenScoreCard to refresh
      window.dispatchEvent(new CustomEvent("sortsahi:score-update"));
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Already answered today
  if (alreadyDone) {
    return (
      <div className="card space-y-5 text-center sm:p-8">
        <Lock className="w-10 h-10 text-green-500 mx-auto" />
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{today}</span>
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          You&apos;ve already completed today&apos;s challenge!
        </h2>
        <p className="text-base leading-7 text-gray-600">
          Come back tomorrow for a new question and more GreenPoints.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700 font-medium">Total GreenScore</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{score.totalPoints} pts</p>
          <p className="text-sm text-green-600">{score.level.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Date header */}
      <div className="flex items-center gap-2 text-base leading-7 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>{today}</span>
      </div>

      {/* Question card */}
      <div className="card space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <span className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
              Daily Challenge · +{POINTS.DAILY_CHALLENGE} pts
            </span>
            <p className="mt-2 text-lg font-extrabold leading-snug text-gray-950 sm:text-xl">
              {question.questionText}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5" role="radiogroup" aria-label="Answer choices">
          {question.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const isCorrectOpt = opt.id === question.correctOptionId;
            let optStyle = "border-gray-200 bg-white text-gray-700 hover:border-green-300";
            if (submitted) {
              if (isCorrectOpt) optStyle = "border-green-400 bg-green-50 text-green-800";
              else if (isSelected && !isCorrectOpt) optStyle = "border-red-300 bg-red-50 text-red-700";
              else optStyle = "border-gray-200 bg-gray-50 text-gray-400";
            } else if (isSelected) {
              optStyle = "border-green-500 bg-green-50 text-green-800 shadow-sm";
            }

            return (
              <button
                key={opt.id}
                role="radio"
                aria-checked={isSelected}
                disabled={submitted}
                onClick={() => !submitted && setSelectedId(opt.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all text-base font-semibold leading-6 text-left sm:px-5 ${optStyle} disabled:cursor-default`}
              >
                <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0">
                  {submitted && isCorrectOpt && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {submitted && isSelected && !isCorrectOpt && <XCircle className="w-4 h-4 text-red-500" />}
                  {!submitted && isSelected && <span className="w-3 h-3 rounded-full bg-green-500" />}
                </span>
                <span className="flex-1">{opt.text}</span>
                {opt.stream && submitted && isCorrectOpt && (
                  <WasteStreamBadge stream={opt.stream} size="sm" showIcon={false} />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit button */}
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className="btn-primary w-full"
          >
            Submit Answer
          </button>
        )}

        {/* Result feedback */}
        {submitted && (
          <div className={`rounded-xl p-4 space-y-3 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-700"}`}>
                {isCorrect ? (
                  <>Correct! {pointsEarned > 0 && `+${pointsEarned} GreenPoints earned!`}</>
                ) : (
                  "Not quite — but you can learn from this!"
                )}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Explanation:</p>
              <p className="text-base leading-7 text-gray-700">{question.explanation}</p>
            </div>

            {question.tip && (
              <div className="flex gap-2 text-sm text-blue-700 bg-blue-50 rounded-lg p-2.5">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong>Tip:</strong> {question.tip}</span>
              </div>
            )}

            {question.source && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" /> Source: {question.source}
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
