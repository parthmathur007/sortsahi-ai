"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanSearch, Trophy, BookOpen } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/classify", label: "Classify", icon: ScanSearch },
  { href: "/challenge", label: "Challenge", icon: Trophy },
  { href: "/history", label: "Progress", icon: BookOpen },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      aria-label="Mobile navigation"
    >
      <div className="flex">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition-colors ${
                isActive
                  ? "text-green-700 bg-green-50"
                  : "text-gray-500 hover:text-green-600"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
