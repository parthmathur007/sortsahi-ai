import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
        <Leaf className="w-5 h-5 text-green-500" />
      </div>
      <p className="text-sm text-gray-400">Loading…</p>
    </div>
  );
}
