import type { WasteStream } from "@/types";
import { STREAM_META } from "@/lib/classification";

interface WasteStreamBadgeProps {
  stream: WasteStream;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function WasteStreamBadge({
  stream,
  size = "md",
  showIcon = true,
}: WasteStreamBadgeProps) {
  const meta = STREAM_META[stream];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const streamClasses: Record<WasteStream, string> = {
    wet: "bg-green-100 text-green-800 border border-green-200",
    dry: "bg-blue-100 text-blue-800 border border-blue-200",
    sanitary: "bg-purple-100 text-purple-800 border border-purple-200",
    special: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses[size]} ${streamClasses[stream]}`}
      role="status"
      aria-label={`Waste stream: ${meta.label}`}
    >
      {showIcon && <span aria-hidden="true">{meta.icon}</span>}
      {meta.label}
    </span>
  );
}
