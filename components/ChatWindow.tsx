"use client";
import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  from: "me" | "artist";
  text: string;
}

export default function ChatWindow({ artistName }: { artistName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "artist", text: `سلام! به کلاس آموزشی من خوش آمدید. چطور می‌توانم کمک کنم؟` },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "me", text }]);
    setText("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "artist", text: "ممنون از پیام شما، به‌زودی پاسخ می‌دهم." }]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-96 rounded-card gold-frame bg-white/70 overflow-hidden">
      <div className="p-3 border-b border-line text-sm font-display">{artistName}</div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] rounded-card px-4 py-2 text-sm ${
              m.from === "me"
                ? "self-start bg-gold text-cream"
                : "self-end bg-creamDark text-softBlack"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 border-t border-line">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="پیام خود را بنویسید..."
          className="flex-1 rounded-full border border-line px-4 py-2 text-sm outline-none focus:border-gold"
        />
        <button onClick={send} className="p-2 rounded-full bg-gold text-cream hover:bg-goldDark transition-colors">
          <Send size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
