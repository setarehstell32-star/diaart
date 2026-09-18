"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import works from "@/data/works.json";
import categories from "@/data/categories.json";
import { Work, Category } from "@/lib/types";
import WorkCard from "@/components/WorkCard";

export default function GalleryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const filtered = useMemo(() => {
    let list = (works as Work[]).filter((w) =>
      w.title.includes(query) || w.artistName.includes(query)
    );
    if (category !== "all") list = list.filter((w) => w.category === category);
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  return (
    <div className="relative">
      <div className="absolute inset-0 art-mona-lisa opacity-[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl">گالری آثار</h1>
          <div className="museum-divider w-24 mx-auto mt-4" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-softBlack/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی اثر یا هنرمند..."
              className="w-full rounded-card border border-line pr-11 pl-4 py-3 text-sm outline-none focus:border-gold bg-white/60"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-card border border-line px-4 py-3 text-sm bg-white/60 outline-none focus:border-gold"
          >
            <option value="all">همه دسته‌ها</option>
            {(categories as Category[]).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-card border border-line px-4 py-3 text-sm bg-white/60 outline-none focus:border-gold flex items-center gap-2"
          >
            <option value="newest">جدیدترین</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-softBlack/50 py-20">اثری با این مشخصات پیدا نشد.</p>
        )}
      </div>
    </div>
  );
}
