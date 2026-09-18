"use client";
import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-line overflow-hidden">
      <div className="absolute inset-0 art-starry-night opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-xl italic mb-3">آرتینو<span className="text-gold"></span></p>
            <p className="text-sm text-softBlack/60 leading-7">
              بازاری برای هنرمندان و صنعتگران؛ هر اثر مستقیم از دستان سازنده‌اش به خانه‌ی شما.
            </p>
          </div>
          <div>
            <p className="text-sm mb-3 text-gold">دسترسی سریع</p>
            <div className="flex flex-col gap-2 text-sm text-softBlack/70">
              <Link href="/gallery">گالری</Link>
              <Link href="/artists">هنرمندان</Link>
              <Link href="/events">رویدادها</Link>
              <Link href="/classes">کلاس‌ها</Link>
            </div>
          </div>
          <div>
            <p className="text-sm mb-3 text-gold">حساب کاربری</p>
            <div className="flex flex-col gap-2 text-sm text-softBlack/70">
              <Link href="/login">ورود / ثبت‌نام</Link>
              <Link href="/buyer/dashboard">داشبورد خریدار</Link>
              <Link href="/artist/dashboard">داشبورد هنرمند</Link>
            </div>
          </div>
          <div>
            <p className="text-sm mb-3 text-gold">تماس با ما</p>
            <div className="flex flex-col gap-3 text-sm text-softBlack/70">
              <span className="flex items-center gap-2"><Mail size={14} strokeWidth={1.5}/> info@artino.ir</span>
              <span className="flex items-center gap-2"><MapPin size={14} strokeWidth={1.5}/> کرمان،ایران</span>
              <span className="flex items-center gap-2"><Instagram size={14} strokeWidth={1.5}/> @artino._.kerman</span>
            </div>
          </div>
        </div>
        <div className="museum-divider my-8" />
        <p className="text-center text-xs text-softBlack/50">
          © {new Date().getFullYear()} آرتینو . تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
