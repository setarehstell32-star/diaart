"use client";
import { useState } from "react";
import artistsData from "@/data/artists.json";
import { Artist } from "@/lib/types";
import { Check } from "lucide-react";

const cities = ["تهران", "اصفهان", "شیراز", "تبریز", "مشهد"];
const cafes: Record<string, string[]> = {
  "تهران": ["کافه گالری نگاه", "کافه هنرمندان"],
  "اصفهان": ["کافه سی‌وسه‌پل"],
  "شیراز": ["کافه ارم"],
  "تبریز": ["کافه ائل‌گلی"],
  "مشهد": ["کافه رضوان"],
};

export default function EventForm() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [cafe, setCafe] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [datetime, setDatetime] = useState("");

  const artists = (artistsData as Artist[]).filter((a) => !city || a.city === city);

  const toggleArtist = (id: string) => {
    setSelectedArtists((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const steps = ["شهر", "کافه", "هنرمندان", "زمان", "ارسال دعوت"];

  return (
    <div className="rounded-cardLg gold-frame bg-white/70 p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div
              className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs ${
                step > i + 1 ? "bg-gold text-cream" : step === i + 1 ? "border border-gold text-gold" : "border border-line text-softBlack/40"
              }`}
            >
              {step > i + 1 ? <Check size={14} /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-line mx-1" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <p className="text-sm mb-4 text-softBlack/70">شهر مورد نظر را انتخاب کنید</p>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`rounded-card border p-3 text-sm ${city === c ? "border-gold bg-gold/10" : "border-line"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-sm mb-4 text-softBlack/70">کافه را انتخاب کنید</p>
          <div className="flex flex-col gap-3">
            {(cafes[city] || []).map((c) => (
              <button
                key={c}
                onClick={() => setCafe(c)}
                className={`rounded-card border p-3 text-sm text-right ${cafe === c ? "border-gold bg-gold/10" : "border-line"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-sm mb-4 text-softBlack/70">هنرمندان این شهر را انتخاب کنید</p>
          <div className="flex flex-col gap-3">
            {artists.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleArtist(a.id)}
                className={`flex items-center justify-between rounded-card border p-3 text-sm ${
                  selectedArtists.includes(a.id) ? "border-gold bg-gold/10" : "border-line"
                }`}
              >
                <span>{a.firstName} {a.lastName}</span>
                {selectedArtists.includes(a.id) && <Check size={16} className="text-gold" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-sm mb-4 text-softBlack/70">تاریخ و ساعت رویداد را تعیین کنید</p>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full rounded-card border border-line p-3 text-sm outline-none focus:border-gold"
          />
        </div>
      )}

      {step === 5 && (
        <div className="text-center py-6">
          <Check size={36} className="mx-auto text-gold mb-3" />
          <p className="font-display text-lg mb-2">دعوت‌نامه ارسال شد!</p>
          <p className="text-sm text-softBlack/60">
            رویداد در {cafe || "—"}، {city || "—"} برای هنرمندان انتخاب‌شده ارسال شد.
          </p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="text-sm text-softBlack/60 disabled:opacity-30"
        >
          قبلی
        </button>
        <button
          onClick={() => setStep((s) => Math.min(5, s + 1))}
          disabled={step === 5}
          className="rounded-card bg-gold text-cream px-5 py-2 text-sm hover:bg-goldDark transition-colors disabled:opacity-30"
        >
          {step === 4 ? "ارسال دعوت‌نامه" : "بعدی"}
        </button>
      </div>
    </div>
  );
}
