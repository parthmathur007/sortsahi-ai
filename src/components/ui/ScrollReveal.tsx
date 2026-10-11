"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, main .card"));
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("scroll-revealed"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach((node) => { node.classList.add("scroll-reveal"); observer.observe(node); });
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
