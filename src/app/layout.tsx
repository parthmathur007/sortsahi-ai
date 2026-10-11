import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "SortSahi AI | Identify It. Sort It Right.",
  description:
    "Identify everyday waste, understand the likely category, and learn responsible disposal guidance with SortSahi AI. Built for clearer sorting decisions and environmental learning.",
  keywords: [
    "waste segregation",
    "waste management India",
    "Swachh Bharat",
    "recycling",
    "household waste",
    "wet waste",
    "dry waste",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-green-50">
        <Header />
        <ScrollReveal />
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
