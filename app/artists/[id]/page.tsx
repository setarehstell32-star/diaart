import Image from "next/image";
import { notFound } from "next/navigation";
import artistsData from "@/data/artists.json";
import worksData from "@/data/works.json";
import reviewsData from "@/data/reviews.json";
import { Artist, Work, Review } from "@/lib/types";
import StarRating from "@/components/StarRating";
import WorkCard from "@/components/WorkCard";
import { MessageCircle, UserPlus } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return (artistsData as Artist[]).map((a) => ({ id: a.id }));
}

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const artist = (artistsData as Artist[]).find((a) => a.id === params.id);
  if (!artist) return notFound();

  const works = (worksData as Work[]).filter((w) => w.artistId === artist.id);
  const reviews = (reviewsData as Review[]).filter((r) => r.artistId === artist.id);

  return (
    <div className="relative">
      <div className="absolute inset-0 art-starry-night opacity-[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-14 rounded-cardLg gold-frame bg-white/60 p-8">
          <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-gold/60 shrink-0">
            <Image src={artist.avatar} alt={artist.firstName} fill className="object-cover" />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h1 className="font-display text-2xl mb-1">{artist.firstName} {artist.lastName}</h1>
            <p className="text-sm text-softBlack/60 mb-3">{artist.city} · {artist.specialty}</p>
            <div className="flex justify-center md:justify-start mb-3">
              <StarRating value={artist.stars} />
              <span className="text-xs text-softBlack/50 mr-2">({artist.reviewCount} نظر)</span>
            </div>
            <p className="text-sm text-softBlack/70 leading-7 max-w-xl">{artist.bio}</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <button className="flex items-center gap-2 rounded-card bg-softBlack text-cream px-5 py-2.5 text-sm hover:bg-gold transition-colors">
              <UserPlus size={16} strokeWidth={1.5} />
              دنبال کردن
            </button>
            {artist.teachesClasses && (
              <Link
                href="/classes"
                className="flex items-center gap-2 rounded-card border border-gold/50 px-5 py-2.5 text-sm hover:bg-gold/10 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                شروع چت
              </Link>
            )}
          </div>
        </div>

        <h2 className="font-display text-2xl mb-6">آثار {artist.firstName}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {works.map((w) => <WorkCard key={w.id} work={w} />)}
        </div>

        <h2 className="font-display text-2xl mb-6">نظرات</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.length === 0 && <p className="text-sm text-softBlack/50">هنوز نظری ثبت نشده است.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="rounded-card gold-frame bg-white/60 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{r.buyerName}</span>
                <StarRating value={r.rating} showValue={false} />
              </div>
              <p className="text-sm text-softBlack/70">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
