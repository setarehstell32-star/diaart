"use client";
import { Quote } from "lucide-react";
import reviewsData from "@/data/reviews.json";
import { Review } from "@/lib/types";
import StarRating from "./StarRating";

export default function Reviews() {
  const reviews = (reviewsData as Review[]).slice(0, 3);

  return (
    <section className="relative py-24 painting-overlay" style={{ ["--overlay-opacity" as any]: 0.92 }}>
      <div className="absolute inset-0 art-girl-pearl opacity-[0.07]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl">نظرات خریداران</h2>
          <div className="museum-divider w-24 mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-card gold-frame bg-cream/70 p-6 shadow-soft">
              <Quote size={20} className="text-gold mb-3" strokeWidth={1.5} />
              <p className="font-display italic text-softBlack/80 leading-8 mb-4">
                «{r.comment}»
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-softBlack/70">{r.buyerName}</span>
                <StarRating value={r.rating} showValue={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
