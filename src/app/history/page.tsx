import { Metadata } from "next";
import { Sprout } from "lucide-react";
import { ProgressFeature } from "@/features/rewards/ProgressFeature";
export const metadata: Metadata = { title: "My Progress — SortSahi AI", description: "Track your GreenScore, level, and learning journey." };
export default function HistoryPage() { return <div className="page-shell max-w-3xl py-10 sm:py-14"><div className="mb-8 sm:mb-10"><div className="eyebrow flex items-center gap-2"><Sprout className="h-4 w-4" /> Your learning journey</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-[#183b2d] sm:text-5xl">Progress that grows.</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#68776a]">Your GreenScore, current level, and activities in one place.</p></div><ProgressFeature /></div>; }
