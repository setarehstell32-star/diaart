"use client";

import { motion } from "framer-motion";
import ArtistCard from "./ArtistCard";
import type { Artist } from "@/lib/types";

interface TopArtistsProps {
  artists: Artist[];
}

export default function TopArtists({ artists }: TopArtistsProps) {
  // مرتب‌سازی بر اساس امتیاز و نمایش ۴ تای برتر
  const topArtists = [...artists]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 4);

  return (
    <section className="relative py-20 art-mona-lisa">
      {/* اوورلی روشن */}
      <div className="absolute inset-0 bg-cream/92" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-gold tracking-[0.3em] text-xs mb-3">
            برگزیدگان این ماه
          </p>
          <h2 className="font-display text-3xl md:text-4xl italic mb-3">
            هنرمندان برتر
          </h2>
          <p className="text-softBlack/60 text-sm">
            پرستاره‌ترین هنرمندان آرتینو
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topArtists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/artists"
            className="inline-block border border-gold text-gold px-8 py-3 rounded-full text-sm hover:bg-gold hover:text-cream transition-colors"
          >
            مشاهده همه هنرمندان
          </a>
        </div>
      </div>
    </section>
  );
}
