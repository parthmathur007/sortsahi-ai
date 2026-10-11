import { Metadata } from "next";
import { Trophy } from "lucide-react";
import { DailyChallengeFeature } from "@/features/learning/DailyChallengeFeature";
export const metadata: Metadata = { title: "Daily Challenge — SortSahi AI", description: "Build your waste sorting knowledge with a quick daily challenge." };
export default function ChallengePage() { return <div className="page-shell max-w-3xl py-10 sm:py-14"><div className="mb-8 sm:mb-10"><div className="eyebrow flex items-center gap-2"><Trophy className="h-4 w-4" /> Learn by doing</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-[#183b2d] sm:text-5xl">The daily challenge</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#68776a]">A quick question can make the next sorting decision easier. Answer correctly to earn GreenPoints.</p></div><DailyChallengeFeature /></div>; }
