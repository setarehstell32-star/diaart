"use client";
import { useState } from "react";
import artistsData from "@/data/artists.json";
import { Artist } from "@/lib/types";
import { MessageCircle } from "lucide-react";
import StarRating from "@/components/StarRating";
import ChatWindow from "@/components/ChatWindow";

export default function ClassesPage() {
  const teachers = (artistsData as Artist[]).filter((a) => a.teachesClasses);
  const [active, setActive] = useState<Artist | null>(null);

  return (
    <div className="relative">
      <div className="absolute inset-0 art-starry-night opacity-[0.06] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl">کلاس‌های آموزشی</h1>
          <p className="text-softBlack/60 mt-3">مستقیماً از هنرمندان مورد علاقه‌تان بیاموزید.</p>
          <div className="museum-divider w-24 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            {teachers.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-card gold-frame bg-white/60 p-4">
                <div className="flex items-center gap-3">
                  <img src={a.avatar} className="h-12 w-12 rounded-full object-cover" alt={a.firstName} />
                  <div>
                    <p className="text-sm">{a.firstName} {a.lastName} — {a.specialty}</p>
                    <StarRating value={a.stars} />
                  </div>
                </div>
                <button
                  onClick={() => setActive(a)}
                  className="flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs hover:bg-gold hover:text-cream transition-colors"
                >
                  <MessageCircle size={14} strokeWidth={1.5} />
                  شروع چت
                </button>
              </div>
            ))}
          </div>

          <div>
            {active ? (
              <ChatWindow artistName={`${active.firstName} ${active.lastName}`} />
            ) : (
              <div className="flex h-96 items-center justify-center rounded-card gold-frame bg-white/40 text-sm text-softBlack/50">
                یک هنرمند را برای شروع گفتگو انتخاب کنید
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
