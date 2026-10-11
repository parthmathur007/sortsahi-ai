import Link from "next/link";
import { Leaf, Home, ScanSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
        <Leaf className="w-8 h-8 text-green-500" />
      </div>
      <div>
        <h1 className="text-5xl font-extrabold text-gray-200 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800">Page not found</h2>
        <p className="text-gray-500 mt-2 text-sm">
          This page seems to have gone to the wrong bin. Let&apos;s get you back on track.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link href="/classify" className="btn-secondary">
          <ScanSearch className="w-4 h-4" /> Classify Waste
        </Link>
      </div>
    </div>
  );
}
