"use client";

import { CheckCircle, AlertTriangle, HelpCircle, Info, ChevronRight } from "lucide-react";
import type { ClassificationResult, ConditionalOption } from "@/types";
import { STREAM_META } from "@/lib/classification";
import { WasteStreamBadge } from "@/components/ui/WasteStreamBadge";

interface Props {
  result: ClassificationResult;
  onConditionalAnswer?: (option: ConditionalOption) => void;
}

export function ClassificationResultCard({ result, onConditionalAnswer }: Props) {
  const {
    itemName,
    stream,
    confidence,
    shortExplanation,
    disposalInstructions,
    preparationTips,
    conditionalQuestion,
    isDemo,
    warnings,
    source,
  } = result;

  const streamMeta = stream ? STREAM_META[stream] : null;

  // ── Conditional question (need more info) ──
  if (conditionalQuestion) {
    return (
      <div className="card border-amber-200 bg-amber-50 space-y-5">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xl font-extrabold text-amber-950">A quick question about {itemName}</h3>
            <p className="mt-2 text-base leading-7 text-amber-900">{shortExplanation}</p>
          </div>
        </div>
        <div>
          <p className="mb-3 text-base font-bold text-amber-950">
            {conditionalQuestion.question}
          </p>
          <div className="flex flex-col gap-2">
            {conditionalQuestion.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => onConditionalAnswer?.(opt)}
                className="flex items-center gap-2 text-left w-full px-4 py-3 bg-white border border-amber-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors text-base font-semibold text-gray-700 group"
              >
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 shrink-0" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Unknown / not found ──
  if (!stream) {
    return (
      <div className="card border-gray-200 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">We need a little more detail</h3>
            <span className="mt-1 block text-sm font-semibold text-amber-700">No confirmed category yet · {itemName}</span>
          </div>
        </div>
        <p className="text-base leading-7 text-gray-700">{shortExplanation}</p>
        {disposalInstructions.length > 0 && (
          <DisposalList instructions={disposalInstructions} />
        )}
        {warnings?.map((w, i) => <WarningNote key={i} text={w} />)}
      </div>
    );
  }

  // ── Full result ──
  const streamColor = streamMeta ? {
    wet: "border-green-200 bg-green-50",
    dry: "border-blue-200 bg-blue-50",
    sanitary: "border-purple-200 bg-purple-50",
    special: "border-red-200 bg-red-50",
  }[stream] : "border-gray-200";

  return (
    <div className={`card border-2 ${streamColor} space-y-6 sm:p-8`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-extrabold text-gray-950 sm:text-2xl">{itemName}</h3>
            <span className={`text-[10px] font-extrabold tracking-wider px-2 py-1 rounded-full border ${isDemo ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-emerald-50 text-emerald-800 border-emerald-200"}`}>
              {isDemo ? "DEMO MODE" : "LIVE AI"}
            </span>
          </div>
          {(confidence === "low" || confidence === "medium") && (
            <span className="text-xs text-amber-700 flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3" /> {confidence === "low" ? "Low confidence — treat this as tentative" : "Moderate confidence — check material and local rules"}
            </span>
          )}
        </div>
        <WasteStreamBadge stream={stream} size="md" />
      </div>

      {/* Stream info banner */}
      {streamMeta && (
        <div className={`rounded-xl p-3 flex items-start gap-3 ${streamMeta.bg} border ${streamMeta.border}`}>
          <span className="text-2xl" aria-hidden="true">{streamMeta.icon}</span>
          <div>
            <p className={`text-base font-extrabold ${streamMeta.color}`}>{streamMeta.label}</p>
            <p className={`mt-1 text-sm leading-6 ${streamMeta.color} opacity-90`}>{streamMeta.description}</p>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div>
        <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-[.12em] mb-2">Why this bin?</h4>
        <p className="text-base leading-7 text-gray-800">{shortExplanation}</p>
      </div>

      {/* Disposal instructions */}
      {disposalInstructions.length > 0 && (
        <div>
          <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-[.12em] mb-3">
            Disposal Steps
          </h4>
          <DisposalList instructions={disposalInstructions} />
        </div>
      )}

      {/* Preparation tips */}
      {preparationTips && preparationTips.length > 0 && (
        <div>
          <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-[.12em] mb-3">
            Preparation Tips
          </h4>
          <ul className="space-y-1.5">
            {preparationTips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-base leading-6 text-gray-700">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {warnings?.filter(w => !w.startsWith("Visual evidence:")).map((w, i) => (
        <WarningNote key={i} text={w} />
      ))}

      {/* Source */}
      {source && (
        <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
          Source: {source}
        </p>
      )}
    </div>
  );
}

function DisposalList({ instructions }: { instructions: string[] }) {
  return (
    <ol className="space-y-2">
      {instructions.map((step, i) => (
        <li key={i} className="flex gap-3 text-base leading-7 text-gray-800">
          <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <span className="leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function WarningNote({ text }: { text: string }) {
  return (
    <div className="flex gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-2.5">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
}
