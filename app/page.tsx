import { supabase } from "@/lib/supabase";
import TopArtists from "@/components/TopArtists";
import type { Artist } from "@/lib/types";

export default async function Home() {
  // خواندن هنرمندان از Supabase
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("stars", { ascending: false });

  return (
    <main>
      {/* 🌟 HERO — شب پرستاره */}
      <section className="art-starry-night painting-overlay-dark relative min-h-[90vh] flex items-center justify-center -mt-16 pt-16">
        <div className="text-center px-6 max-w-3xl mx-auto">
          <p className="text-petrol-border tracking-[0.3em] text-xs md:text-sm mb-6">
            پلتفرم هنر دست‌ساز ایرانی
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream mb-6 leading-tight italic">
            جایی که هنر،
            <br />
            خانه‌ای پیدا می‌کند
          </h1>
          <p className="text-cream/80 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            آثار دست‌ساز هنرمندان ایرانی را کشف کن، بخر و حمایت کن
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="/gallery"
              className="bg-petrol text-cream px-8 py-3 rounded-full text-sm hover:bg-petrol-dark transition-colors shadow-petrol"
            >
              شروع خرید
            </a>
            <a
              href="/login"
              className="border border-cream/60 text-cream px-8 py-3 rounded-full text-sm hover:bg-cream hover:text-petrol transition-colors"
            >
              من هنرمندم
            </a>
          </div>
        </div>
      </section>

      {/* 📊 سه آمار */}
      <section className="bg-cream py-12 border-b border-line">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-display text-3xl md:text-4xl text-petrol mb-2">
              ۱۲۴
            </p>
            <p className="text-xs md:text-sm text-softBlack/60">هنرمند فعال</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-4xl text-petrol mb-2">
              ۸۹۰
            </p>
            <p className="text-xs md:text-sm text-softBlack/60">اثر دست‌ساز</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-4xl text-petrol mb-2">
              ۴٫۹
            </p>
            <p className="text-xs md:text-sm text-softBlack/60">
              امتیاز هنرمندان
            </p>
          </div>
        </div>
      </section>

      {/* 🎨 دسته‌بندی‌ها */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-3 italic">
            دسته‌بندی‌های محبوب
          </h2>
          <p className="text-center text-softBlack/60 mb-12 text-sm">
            از میان آثار متنوع هنرمندان ایرانی انتخاب کن
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: "نقاشی", class: "art-mona-lisa" },
              { name: "سفال", class: "art-girl-pearl" },
              { name: "مجسمه", class: "art-the-scream" },
              { name: "اکسسوری", class: "art-starry-night" },
              { name: "جواهرات", class: "art-girl-pearl" },
              { name: "بافت", class: "art-starry-night" },
            ].map((cat, i) => (
              <a
                key={i}
                href={`/gallery?category=${cat.name}`}
                className="group relative h-44 md:h-56 rounded-card overflow-hidden petrol-frame"
              >
                <div
                  className={`absolute inset-0 ${cat.class} group-hover:scale-110 transition-transform duration-700`}
                />
                <div className="absolute inset-0 bg-softBlack/30 group-hover:bg-softBlack/50 transition-colors" />
                <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between">
                  <span className="text-cream font-medium text-lg">
                    {cat.name}
                  </span>
                  <span className="text-cream text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    مشاهده ←
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ هنرمندان برتر — از Supabase */}
      <TopArtists artists={(artists || []) as Artist[]} />

      {/* 🖼️ CTA پایانی */}
      <section className="py-20 bg-softBlack text-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6 italic">
            هنرمندی؟ بیا اینجا
          </h2>
          <p className="text-cream/70 mb-8 leading-relaxed">
            به جای فروش توی اینستاگرام، آثارت رو توی یه گالری واقعی به نمایش
            بذار
          </p>
          <a
            href="/login"
            className="inline-block bg-petrol text-cream px-8 py-3 rounded-full text-sm hover:bg-petrol-dark transition-colors"
          >
            شروع کن
          </a>
        </div>
      </section>
    </main>
  );
}
