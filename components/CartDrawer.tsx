"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";
import { formatToman } from "@/lib/utils";

export default function CartDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
}) {
  const total = items.reduce((s, it) => s + it.work.price * it.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-softBlack/40 z-40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-auto left-0 top-0 z-50 h-full w-80 bg-cream shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-line">
              <h3 className="font-display text-lg">سبد خرید</h3>
              <button onClick={onClose} aria-label="بستن">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {items.map((it) => (
                <div key={it.work.id} className="flex gap-3 items-center border-b border-line pb-4">
                  <img src={it.work.image} alt={it.work.title} className="h-16 w-16 rounded-card object-cover" />
                  <div className="flex-1">
                    <p className="text-sm">{it.work.title}</p>
                    <p className="text-xs text-softBlack/60">{formatToman(it.work.price)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="p-1 border border-line rounded"><Minus size={12} /></button>
                      <span className="text-xs">{it.quantity}</span>
                      <button className="p-1 border border-line rounded"><Plus size={12} /></button>
                    </div>
                  </div>
                  <button className="text-softBlack/40 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-line">
              <div className="flex justify-between text-sm mb-4">
                <span>جمع کل</span>
                <span>{formatToman(total)}</span>
              </div>
              <button className="w-full rounded-card bg-softBlack text-cream py-3 text-sm hover:bg-gold transition-colors">
                ادامه‌ی خرید
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
