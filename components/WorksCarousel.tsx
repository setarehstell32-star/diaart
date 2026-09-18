"use client";
import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import works from "@/data/works.json";
import { Work } from "@/lib/types";
import WorkCard from "./WorkCard";

export default function WorksCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = (works as Work[]).slice(0, 10);

  const scroll = (dir: "next" | "prev") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = 300 * (dir === "next" ? -1 : 1); // RTL: next moves right-to-left
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl text-softBlack">آثار برگزیده</h2>
          <div className="museum-divider w-24 mt-4" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("prev")}
            className="rounded-full border border-gold/50 p-2 hover:bg-gold hover:text-cream transition-colors"
            aria-label="قبلی"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll("next")}
            className="rounded-full border border-gold/50 p-2 hover:bg-gold hover:text-cream transition-colors"
            aria-label="بعدی"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {items.map((w) => (
          <div key={w.id} className="shrink-0 w-64">
            <WorkCard work={w} />
          </div>
        ))}
      </div>
    </section>
  );
}
