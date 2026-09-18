"use client";
import { useState } from "react";

export default function ClassToggle({ initial = false }: { initial?: boolean }) {
  const [enabled, setEnabled] = useState(initial);

  return (
    <div className="flex items-center justify-between rounded-card gold-frame bg-white/60 p-4">
      <div>
        <p className="text-sm">فعال‌سازی کلاس آموزشی</p>
        <p className="text-xs text-softBlack/50 mt-1">
          با فعال کردن این گزینه، خریداران می‌توانند برای آموزش با شما گفتگو کنند.
        </p>
      </div>
      <button
        onClick={() => setEnabled((v) => !v)}
        className={`relative h-7 w-12 rounded-full transition-colors ${enabled ? "bg-gold" : "bg-line"}`}
        aria-pressed={enabled}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-[-1.5rem]" : "translate-x-0"
          }`}
          style={{ right: "0.15rem" }}
        />
      </button>
    </div>
  );
}
