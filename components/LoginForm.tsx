"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [tab, setTab] = useState<"buyer" | "artist">("buyer");

  return (
    <div className="w-full max-w-md">
      <div className="flex mb-8 rounded-card border border-gold/40 p-1">
        <button
          onClick={() => setTab("buyer")}
          className={`flex-1 rounded-card py-2.5 text-sm transition-colors ${
            tab === "buyer" ? "bg-softBlack text-cream" : "text-softBlack/60"
          }`}
        >
          خریدار
        </button>
        <button
          onClick={() => setTab("artist")}
          className={`flex-1 rounded-card py-2.5 text-sm transition-colors ${
            tab === "artist" ? "bg-softBlack text-cream" : "text-softBlack/60"
          }`}
        >
          هنرمند
        </button>
      </div>

      <motion.form
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="نام" />
          <input className="input" placeholder="نام خانوادگی" />
        </div>
        <input className="input" placeholder="شماره موبایل" />
        <input className="input" placeholder="ایمیل" type="email" />

        {tab === "buyer" ? (
          <>
            <input className="input" placeholder="آدرس کامل" />
            <input className="input" placeholder="شهر" />
          </>
        ) : (
          <>
            <input className="input" placeholder="شهر" />
            <textarea className="input min-h-24" placeholder="بیوگرافی کوتاه" />
            <input className="input" placeholder="آیدی اینستاگرام" />
          </>
        )}

        <button
          type="submit"
          className="mt-2 rounded-card bg-gold text-cream py-3 text-sm hover:bg-goldDark transition-colors"
        >
          ورود / ثبت‌نام
        </button>
      </motion.form>

      <style jsx global>{`
        .input {
          border: 1px solid #e7decd;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          background: rgba(255,255,255,0.6);
          outline: none;
        }
        .input:focus {
          border-color: #c9a96e;
        }
      `}</style>
    </div>
  );
}
