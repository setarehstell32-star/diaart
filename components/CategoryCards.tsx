"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import categories from "@/data/categories.json";
import { Category } from "@/lib/types";
import { paintingClass } from "@/lib/utils";

export default function CategoryCards() {
  const items = (categories as Category[]).slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl text-softBlack">دسته‌بندی آثار</h2>
        <div className="museum-divider w-24 mx-auto mt-4" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((c, i) => {
          const Icon = (Icons as any)[c.icon] ?? Icons.Circle;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href="/gallery"
                className="group relative block h-40 md:h-48 overflow-hidden rounded-card gold-frame"
              >
                <div className={`absolute inset-0 ${paintingClass(c.paintingCrop)} opacity-70 transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-softBlack/70 via-softBlack/10 to-transparent" />
                <div className="relative h-full flex flex-col items-center justify-end gap-2 pb-5 text-cream">
                  <Icon size={22} strokeWidth={1.5} />
                  <span className="text-sm">{c.name}</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
