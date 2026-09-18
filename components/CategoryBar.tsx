"use client";
import categories from "@/data/categories.json";
import * as Icons from "lucide-react";
import { Category } from "@/lib/types";

export default function CategoryBar() {
  const items = categories as Category[];
  return (
    <div className="border-b border-line bg-cream/60">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex gap-8 overflow-x-auto py-3 no-scrollbar">
          {items.map((c) => {
            const Icon = (Icons as any)[c.icon] ?? Icons.Circle;
            return (
              <button
                key={c.id}
                className="group relative flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-softBlack/70 hover:text-softBlack transition-colors pb-1"
              >
                <Icon size={16} strokeWidth={1.5} className="text-gold" />
                {c.name}
                <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
