"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, User, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

const links = [
  { href: "/gallery", label: "گالری" },
  { href: "/artists", label: "هنرمندان" },
  { href: "/events", label: "رویدادها" },
  { href: "/classes", label: "کلاس‌ها" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const { data } = await supabase
          .from("profiles")
          .select("role, name")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    }

    loadUser();

    // گوش دادن به تغییرات Auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from("profiles")
          .select("role, name")
          .eq("id", session.user.id)
          .single();
        setProfile(data);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const dashboardHref =
    profile?.role === "artist" ? "/artist/dashboard" : "/buyer/dashboard";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-softBlack/80 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-cinzel text-2xl md:text-3xl font-semibold tracking-[0.2em] text-cream hover:text-petrol-border transition-colors"
          >
            ARTINO
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-sm text-cream hover:text-petrol-border after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-petrol-border after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-cream hover:text-petrol-border transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-petrol text-[10px] text-cream">
                0
              </span>
            </Link>

            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="flex items-center gap-2 rounded-card border border-cream/60 px-4 py-2 text-sm text-cream hover:bg-petrol hover:border-petrol transition-colors"
                >
                  <LayoutDashboard size={16} strokeWidth={1.5} />
                  پنل من
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-cream hover:text-red-300 transition-colors"
                  title="خروج"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-card border border-cream/60 px-4 py-2 text-sm text-cream hover:bg-petrol hover:text-cream hover:border-petrol transition-colors"
              >
                <User size={16} strokeWidth={1.5} />
                ورود
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-cream"
            onClick={() => setOpen(!open)}
            aria-label="منو"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-softBlack/95 backdrop-blur-md border-t border-cream/10 px-5 pb-5"
        >
          <div className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-cream"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t border-cream/10">
              {user ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={() => setOpen(false)}
                    className="text-sm text-petrol-border"
                  >
                    پنل من
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-300"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm text-petrol-border"
                >
                  ورود / ثبت‌نام
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
