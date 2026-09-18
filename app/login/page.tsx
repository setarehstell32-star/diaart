"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, MapPin, Instagram } from "lucide-react";
import { signUp, signIn } from "@/lib/auth";

type Role = "buyer" | "artist";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("buyer");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp({
          email,
          password,
          role,
          name,
          lastName,
          mobile,
          city,
          address: role === "buyer" ? address : undefined,
          bio: role === "artist" ? bio : undefined,
          instagram: role === "artist" ? instagram : undefined,
        });

        alert("ثبت‌نام موفق! حالا وارد شو.");
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        if (role === "artist") {
          router.push("/artist/dashboard");
        } else {
          router.push("/buyer/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-petrol-soft">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center px-6 py-12 lg:py-0 order-2 lg:order-1">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link
                href="/"
                className="font-cinzel text-3xl font-semibold tracking-[0.2em] text-petrol"
              >
                ARTINO
              </Link>
              <p className="text-sm text-petrol/60 mt-2">
                {isSignUp ? "به آرتینو خوش آمدی" : "خوش برگشتی"}
              </p>
            </div>

            <div className="flex bg-white rounded-full p-1 mb-6 shadow-petrol">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`flex-1 py-2 rounded-full text-sm transition-all ${
                  role === "buyer"
                    ? "bg-petrol text-white shadow"
                    : "text-petrol/60 hover:text-petrol"
                }`}
              >
                خریدار
              </button>
              <button
                type="button"
                onClick={() => setRole("artist")}
                className={`flex-1 py-2 rounded-full text-sm transition-all ${
                  role === "artist"
                    ? "bg-petrol text-white shadow"
                    : "text-petrol/60 hover:text-petrol"
                }`}
              >
                هنرمند
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4">
                {error}
              </div>
            )}

            <motion.form
              key={role + (isSignUp ? "-signup" : "-login")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-petrol space-y-4"
            >
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    icon={<User size={16} />}
                    placeholder="نام"
                    value={name}
                    onChange={setName}
                    required
                  />
                  <InputField
                    icon={<User size={16} />}
                    placeholder="نام خانوادگی"
                    value={lastName}
                    onChange={setLastName}
                  />
                </div>
              )}

              <InputField
                icon={<Mail size={16} />}
                placeholder="ایمیل"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />

              <InputField
                icon={<Lock size={16} />}
                placeholder="رمز عبور (حداقل ۶ کاراکتر)"
                type="password"
                value={password}
                onChange={setPassword}
                required
              />

              {isSignUp && (
                <>
                  <InputField
                    icon={<Phone size={16} />}
                    placeholder="شماره موبایل"
                    type="tel"
                    value={mobile}
                    onChange={setMobile}
                  />

                  <InputField
                    icon={<MapPin size={16} />}
                    placeholder="شهر"
                    value={city}
                    onChange={setCity}
                  />

                  {role === "buyer" && (
                    <InputField
                      icon={<MapPin size={16} />}
                      placeholder="آدرس دقیق"
                      value={address}
                      onChange={setAddress}
                    />
                  )}

                  {role === "artist" && (
                    <>
                      <InputField
                        icon={<Instagram size={16} />}
                        placeholder="اینستاگرام (اختیاری)"
                        value={instagram}
                        onChange={setInstagram}
                      />
                      <textarea
                        placeholder="بیوگرافی کوتاه"
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full rounded-xl border border-petrol/20 bg-petrol-soft/40 px-4 py-3 text-sm outline-none focus:border-petrol focus:bg-white transition-colors resize-none"
                      />
                    </>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-petrol text-white py-3 rounded-xl text-sm font-medium hover:bg-petrol-dark transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "لطفاً صبر کن..." : isSignUp ? "ثبت‌نام" : "ورود"}
              </button>

              <p className="text-center text-sm text-petrol/60 pt-2">
                {isSignUp ? "حساب داری؟" : "حساب نداری؟"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-petrol font-medium hover:text-petrol-dark transition-colors"
                >
                  {isSignUp ? "وارد شو" : "ثبت‌نام کن"}
                </button>
              </p>
            </motion.form>
          </div>
        </div>

        <div className="relative hidden lg:block art-the-scream order-1 lg:order-2" />
      </div>
    </main>
  );
}

function InputField({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-petrol/40">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-petrol/20 bg-petrol-soft/40 pr-11 pl-4 py-3 text-sm outline-none focus:border-petrol focus:bg-white transition-colors"
      />
    </div>
  );
}
