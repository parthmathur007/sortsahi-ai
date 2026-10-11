import { Metadata } from "next";
import { ClassifyFeature } from "@/features/classification/ClassifyFeature";
import { ScanSearch } from "lucide-react";

export const metadata: Metadata = { title: "Sort an Item — SortSahi AI", description: "Identify an everyday item and learn how to dispose of it responsibly." };

export default function ClassifyPage() {
  return <div className="page-shell max-w-4xl py-10 sm:py-14"><div className="mb-8 sm:mb-10"><div className="eyebrow flex items-center gap-2"><ScanSearch className="h-4 w-4" /> Waste identification</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-[#183b2d] sm:text-5xl">Where does it go?</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#68776a]">Search for an item or add a photo. We’ll help you understand the likely category and the next step.</p></div><ClassifyFeature /></div>;
}
