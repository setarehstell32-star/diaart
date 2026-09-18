"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
import { LogOut, ShoppingBag, Heart, User, MapPin } from "lucide-react";

interface Profile {
  id: string;
  role: string;
  name: string;
  last_name: string;
  email: string;
  city: string;
  address: string;
  mobile: string;
}

export default function BuyerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        router.push("/login");
        return;
      }

      if (data.role !== "buyer") {
        router.push("/artist/dashboard");
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-petrol">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-petrol-soft py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* هدر پنل */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-petrol mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-petrol/60 text-sm mb-1">پنل خریدار</p>
              <h1 className="font-display text-3xl text-petrol italic">
                سلام {profile.name} 👋
              </h1>
              <p className="text-petrol/70 text-sm mt-1">{profile.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-petrol text-white px-4 py-2 rounded-xl text-sm hover:bg-petrol-dark transition"
            >
              <LogOut size={16} />
              خروج
            </button>
          </div>
        </div>

        {/* کارت‌های آماری */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-petrol">
            <ShoppingBag className="text-petrol mb-3" size={24} />
            <p className="text-3xl font-display text-petrol mb-1">۰</p>
            <p className="text-sm text-petrol/60">خرید انجام شده</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-petrol">
            <Heart className="text-petrol mb-3" size={24} />
            <p className="text-3xl font-display text-petrol mb-1">۰</p>
            <p className="text-sm text-petrol/60">اثر مورد علاقه</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-petrol">
            <User className="text-petrol mb-3" size={24} />
            <p className="text-3xl font-display text-petrol mb-1">۰</p>
            <p className="text-sm text-petrol/60">هنرمند دنبال‌شده</p>
          </div>
        </div>

        {/* اطلاعات پروفایل */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-petrol mb-6">
          <h2 className="font-display text-2xl text-petrol mb-6 italic">
            اطلاعات من
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <InfoRow
              label="نام و نام خانوادگی"
              value={`${profile.name} ${profile.last_name || ""}`}
            />
            <InfoRow label="ایمیل" value={profile.email} />
            <InfoRow label="شماره موبایل" value={profile.mobile || "—"} />
            <InfoRow label="شهر" value={profile.city || "—"} />
          </div>
          {profile.address && (
            <div className="mt-6 pt-6 border-t border-petrol/10">
              <p className="text-petrol/60 text-sm mb-2 flex items-center gap-2">
                <MapPin size={14} />
                آدرس
              </p>
              <p className="text-petrol">{profile.address}</p>
            </div>
          )}
        </div>

        {/* دکمه گالری */}
        <div className="bg-white rounded-2xl p-8 shadow-petrol text-center">
          <div className="w-16 h-16 bg-petrol-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="text-petrol" size={28} />
          </div>
          <h3 className="font-display text-xl text-petrol mb-2 italic">
            شروع خرید
          </h3>
          <p className="text-petrol/60 text-sm mb-6">
            از میان آثار هنرمندان ایرانی انتخاب کن
          </p>
          <a
            href="/gallery"
            className="inline-block bg-petrol text-white px-6 py-3 rounded-xl text-sm hover:bg-petrol-dark transition"
          >
            مشاهده گالری
          </a>
        </div>
      </div>
    </main>
  );
}

/* کامپوننت کمکی */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-petrol-soft/40 rounded-xl p-4">
      <p className="text-petrol/60 text-xs mb-1">{label}</p>
      <p className="text-petrol font-medium">{value}</p>
    </div>
  );
}
