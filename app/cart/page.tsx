"use client";
import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import worksData from "@/data/works.json";
import { Work } from "@/lib/types";
import { formatToman } from "@/lib/utils";

export default function CartPage() {
  const seed = (worksData as Work[]).slice(0, 3);
  const [items, setItems] = useState(seed.map((w) => ({ work: w, quantity: 1 })));

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.work.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it
      )
    );
  };

  const remove = (id: string) => setItems((prev) => prev.filter((it) => it.work.id !== id));

  const total = items.reduce((s, it) => s + it.work.price * it.quantity, 0);

  return (
    <div className="relative">
      <div className="absolute inset-0 art-mona-lisa opacity-[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8 py-16">
        <h1 className="font-display text-3xl mb-10">سبد خرید</h1>

        {items.length === 0 ? (
          <p className="text-center text-softBlack/50 py-20">سبد خرید شما خالی است.</p>
        ) : (
          <div className="grid md:grid-cols-[1fr_320px] gap-10">
            <div className="flex flex-col gap-4">
              {items.map((it) => (
                <div key={it.work.id} className="flex items-center gap-4 rounded-card gold-frame bg-white/60 p-4">
                  <img src={it.work.image} className="h-20 w-20 rounded-card object-cover" alt={it.work.title} />
                  <div className="flex-1">
                    <p className="text-sm">{it.work.title}</p>
                    <p className="text-xs text-softBlack/60 mb-2">{it.work.artistName}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(it.work.id, -1)} className="p-1.5 border border-line rounded"><Minus size={12} /></button>
                      <span className="text-sm">{it.quantity}</span>
                      <button onClick={() => updateQty(it.work.id, 1)} className="p-1.5 border border-line rounded"><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="text-sm">{formatToman(it.work.price * it.quantity)}</div>
                  <button onClick={() => remove(it.work.id)} className="text-softBlack/40 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-card gold-frame bg-white/60 p-6 h-fit">
              <div className="flex justify-between text-sm mb-3">
                <span>جمع اقلام</span>
                <span>{formatToman(total)}</span>
              </div>
              <div className="flex justify-between text-sm mb-5">
                <span>هزینه ارسال</span>
                <span>رایگان</span>
              </div>
              <div className="museum-divider mb-5" />
              <div className="flex justify-between text-base mb-6">
                <span>مبلغ نهایی</span>
                <span className="text-gold">{formatToman(total)}</span>
              </div>
              <Link
                href="/checkout"
                className="block text-center rounded-card bg-softBlack text-cream py-3 text-sm hover:bg-gold transition-colors mb-3"
              >
                پرداخت
              </Link>
              <Link href="/gallery" className="block text-center text-sm text-softBlack/60 hover:text-gold">
                ادامه خرید
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
