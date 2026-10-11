"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ArrowUpRight, Recycle } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/classify", label: "Sort an item" },
    { href: "/challenge", label: "Daily challenge" },
    { href: "/history", label: "My progress" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[#e0e7dc] bg-[#fbfcf7]/95 backdrop-blur-md">
      <div className="page-shell flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="SortSahi AI home">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e2edda] text-[#285b3d]"><Leaf className="absolute h-6 w-6 -rotate-12" strokeWidth={2.2} /><Recycle className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[#e2edda]" strokeWidth={2.6} /></span>
          <span className="leading-tight"><span className="block text-[22px] font-extrabold tracking-[-.055em] text-[#183b2d]">SortSahi <span className="text-[#62844c]">AI</span></span><span className="hidden text-[11px] font-bold uppercase tracking-[.13em] text-[#71836f] sm:block">Identify it. Sort it right.</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return <Link key={link.href} href={link.href} aria-current={isActive ? "page" : undefined} className={`rounded-full px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "bg-[#e8f0e2] text-[#214d34]" : "text-[#647166] hover:bg-[#f0f4eb] hover:text-[#214d34]"}`}>{link.label}</Link>;
          })}
        </nav>
        <Link href="/classify" className="hidden items-center gap-2 rounded-full bg-[#285b3d] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#19462d] sm:inline-flex">Try it <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </header>
  );
}
