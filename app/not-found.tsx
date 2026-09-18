import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 art-the-scream opacity-[0.18]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/90 to-cream" />
      <div className="relative text-center px-6">
        <p className="font-display text-8xl mb-4 text-softBlack">۴۰۴</p>
        <h1 className="font-display text-2xl mb-3">حتی نقاشی هم این صفحه را پیدا نکرد!</h1>
        <p className="text-softBlack/60 mb-8">
          به نظر می‌رسد این اثر از قاب بیرون افتاده. بیایید شما را به گالری برگردانیم.
        </p>
        <Link
          href="/"
          className="rounded-card bg-softBlack text-cream px-6 py-3 text-sm hover:bg-gold transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
