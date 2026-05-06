"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";

// [İsim](url) formatındaki markdown linkleri tıklanabilir <a> tagına çevirir
function renderMarkdown(text: string) {
  const parts = text.split(/(\[([^\]]+)\]\((https?:\/\/[^)]+)\))/g);
  const result: React.ReactNode[] = [];

  let i = 0;
  while (i < parts.length) {
    const part = parts[i];
    if (/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.test(part)) {
      const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
      if (match) {
        result.push(
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold text-orange-600 hover:text-orange-700 break-all"
          >
            {match[1]}
          </a>
        );
        i++;
        continue;
      }
    }
    if (part) {
      const lines = part.split("\n");
      lines.forEach((line, li) => {
        result.push(<span key={`${i}-${li}`}>{line}</span>);
        if (li < lines.length - 1) result.push(<br key={`br-${i}-${li}`} />);
      });
    }
    i++;
  }

  return result;
}

export default function Chatbox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ]);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ⏱️ Popup kontrolü (3 dakikada bir)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }, 180000);

    const firstTimeout = setTimeout(() => setShowPopup(false), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.answer ?? data.error ?? "Bir hata oluştu.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Bağlantı hatası oluştu." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* POPUP MESAJ */}
      {!open && showPopup && (
        <div className="fixed bottom-24 right-6 bg-white text-black px-4 py-2 rounded-xl shadow-lg text-sm z-50 animate-fade-in">
          👋 Merhaba ben Koi, sana yardımcı olmamı ister misin?
        </div>
      )}

      {/* AÇMA BUTONU */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center shadow-lg z-50"
        >
          <Bot size={30} className="text-white" />
        </button>
      )}

      {/* CHATBOX */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white text-black rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* HEADER */}
          <div className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="koi"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <h2 className="font-bold">KOI Chat</h2>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* MESAJLAR */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "ml-auto bg-orange-500 text-white"
                    : "mr-auto bg-white text-gray-800"
                }`}
              >
                {msg.role === "bot" ? renderMarkdown(msg.text) : msg.text}
              </div>
            ))}

            {loading && (
              <div className="mr-auto bg-white text-gray-800 px-4 py-2 rounded-xl text-sm flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-orange-500" />
                Yanıt yazılıyor...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t bg-white flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Mesaj yaz..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-xl disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}