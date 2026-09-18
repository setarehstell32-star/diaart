"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Work } from "@/lib/types";
import { formatToman } from "@/lib/utils";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <div className="group rounded-card overflow-hidden bg-white/60 gold-frame shadow-soft hover:shadow-lg transition-shadow duration-500">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute top-3 left-3 rounded-full bg-cream/80 p-2 backdrop-blur hover:text-gold transition-colors"
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gold mb-1">{work.artistName}</p>
        <h3 className="font-display text-lg mb-2">{work.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-softBlack/80">{formatToman(work.price)}</span>
          <Link
            href={`/gallery`}
            className="text-xs rounded-full border border-gold/50 px-3 py-1.5 hover:bg-gold hover:text-cream transition-colors"
          >
            مشاهده
          </Link>
        </div>
      </div>
    </div>
  );
}
