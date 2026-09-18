"use client";
import worksData from "@/data/works.json";
import { Work } from "@/lib/types";
import { formatToman } from "@/lib/utils";
import { Lock } from "lucide-react";

export default function CheckoutPage() {
  const items = (worksData as Work[]).slice(0, 3);
  const total = items.reduce((s, w) => s + w.price, 0);

  return (
    <div className="relative">
      <div className="absolute inset-0 art-starry-night opacity-[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8 py-16">
        <h1 className="font-display text-3xl mb-10">تسویه حساب</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-lg mb-4">اطلاعات ارسال</h2>
            <div className="flex flex-col gap-4">
              <input className="rounded-card border border-line p-3 text-sm outline-none focus:border-gold" placeholder="نام گیرنده" />
              <input className="rounded-card border border-line p-3 text-sm outline-none focus:border-gold" placeholder="شماره تماس" />
              <input className="rounded-card border border-line p-3 text-sm outline-none focus:border-gold" placeholder="آدرس کامل" />
              <input className="rounded-card border border-line p-3 text-sm outline-none focus:border-gold" placeholder="شهر" />
            </div>
          </div>

          <div className="rounded-card gold-frame bg-white/60 p-6 h-fit">
            <h2 className="font-display text-lg mb-4">خلاصه سفارش</h2>
            <div className="flex flex-col gap-3 mb-4">
              {items.map((w) => (
                <div key={w.id} className="flex justify-between text-sm">
                  <span>{w.title}</span>
                  <span className="text-softBlack/60">{formatToman(w.price)}</span>
                </div>
              ))}
            </div>
            <div className="museum-divider mb-4" />
            <div className="flex justify-between text-base mb-6">
              <span>مبلغ قابل پرداخت</span>
              <span className="text-gold">{formatToman(total)}</span>
            </div>
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 rounded-card bg-softBlack/40 text-cream py-3 text-sm cursor-not-allowed"
            >
              <Lock size={14} strokeWidth={1.5} />
              درگاه پرداخت (به‌زودی)
            </button>
            <p className="text-xs text-center text-softBlack/40 mt-3">
              اتصال به درگاه پرداخت در این نسخه پیاده‌سازی نشده است.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
