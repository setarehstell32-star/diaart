"use client";
import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/lib/types";
import StarRating from "./StarRating";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="rounded-card gold-frame bg-white/60 p-5 text-center shadow-soft hover:shadow-lg transition-shadow duration-500">
      <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-gold/60">
        <Image src={artist.avatar} alt={artist.firstName} fill className="object-cover" />
      </div>
      <h3 className="font-display text-lg">{artist.firstName} {artist.lastName}</h3>
      <p className="text-xs text-softBlack/60 mb-2">{artist.city} · {artist.specialty}</p>
      <div className="flex justify-center mb-4">
        <StarRating value={artist.stars} />
      </div>
      <Link
        href={`/artists/${artist.id}`}
        className="inline-block rounded-full border border-gold/50 px-4 py-1.5 text-xs hover:bg-gold hover:text-cream transition-colors"
      >
        مشاهده پروفایل
      </Link>
    </div>
  );
}
