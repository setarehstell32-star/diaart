import EventForm from "@/components/EventForm";

export default function EventsPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 art-the-scream opacity-[0.06] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl">برگزاری رویداد هنری</h1>
          <p className="text-softBlack/60 mt-3 max-w-xl mx-auto">
            یک دورهمی هنری در کافه‌ی مورد علاقه‌تان با حضور هنرمندان شهر خودتان ترتیب دهید.
          </p>
          <div className="museum-divider w-24 mx-auto mt-4" />
        </div>
        <EventForm />
      </div>
    </div>
  );
}
