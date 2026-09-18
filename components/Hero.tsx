"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 art-starry-night opacity-[0.16]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/80 to-cream" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-28 md:py-36">
        <div className="mx-auto max-w-2xl text-center border border-gold/40 rounded-cardLg px-8 py-14 bg-cream/50 backdrop-blur-[2px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold text-sm tracking-wide mb-4"
          >
            بازاری برای هنرمندان و صنعتگران ایران
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl leading-[1.4] text-softBlack"
          >
            هر اثر، روایتی از دستان یک هنرمند
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-softBlack/70 leading-8"
          >
            نقاشی، سفال، مجسمه و زیورآلات دست‌ساز را مستقیم از هنرمندان کشف کنید،
            دنبال کنید و گفتگو کنید — بدون واسطه.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/gallery"
              className="rounded-card bg-softBlack text-cream px-7 py-3 text-sm hover:bg-gold transition-colors"
            >
              مشاهده‌ی گالری
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-card border border-gold/50 px-7 py-3 text-sm hover:bg-gold/10 transition-colors"
            >
              هنرمند هستید؟ عضو شوید
              <ArrowLeft size={16} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
