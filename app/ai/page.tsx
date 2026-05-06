"use client";

import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/data/providers";
import {
  Bot,
  Send,
  X,
  ChevronDown,
  Loader2,
  Sparkles,
  User,
} from "lucide-react";

// ─── Model seçenekleri (hf-client'taki HF_MODELS key'leriyle eşleşmeli) ───
const MODEL_OPTIONS = [
  { key: "mistral-7b", label: "Mistral 7B" },
  { key: "llama-3-8b", label: "LLaMA 3 8B" },
  { key: "gemma-7b", label: "Gemma 7B" },
  { key: "phi-3", label: "Phi-3 Mini" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

// ─── Chat paneli ───────────────────────────────────────────────────────────
function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [modelKey, setModelKey] = useState(MODEL_OPTIONS[0].key);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, modelKey }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error ?? "Bir hata oluştu." },
        ]);
        return;
      }

      // Streaming SSE okuma
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;
          try {
            const json = JSON.parse(raw);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            assistantText += delta;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: assistantText,
              };
              return updated;
            });
          } catch {
            // parse hatası → atla
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Bağlantı hatası oluştu." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Textarea auto-resize
  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[370px] flex-col rounded-3xl border border-black/10 bg-white shadow-2xl overflow-hidden"
      style={{ height: "540px" }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-black/8 bg-[#faf9f7] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d86f3d]">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2b2b2b]">AI Asistan</p>
            <p className="text-[10px] text-[#2b2b2b]/50">Hugging Face · Streaming</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Model seçici */}
          <div className="relative">
            <select
              value={modelKey}
              onChange={(e) => setModelKey(e.target.value)}
              className="appearance-none rounded-lg border border-black/10 bg-white py-1.5 pl-2.5 pr-7 text-xs text-[#2b2b2b] outline-none focus:border-[#d86f3d] cursor-pointer"
            >
              {MODEL_OPTIONS.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#2b2b2b]/40" />
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#2b2b2b]/40 hover:bg-black/5 hover:text-[#2b2b2b] transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3ec]">
              <Sparkles className="h-6 w-6 text-[#d86f3d]" />
            </div>
            <p className="text-sm font-medium text-[#2b2b2b]">Nasıl yardımcı olabilirim?</p>
            <p className="text-xs text-[#2b2b2b]/50 max-w-[220px]">
              Model seç ve sormak istediğin şeyi yaz.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${
                msg.role === "user"
                  ? "bg-[#2b2b2b]"
                  : "bg-[#d86f3d]"
              }`}
            >
              {msg.role === "user" ? (
                <User className="h-3.5 w-3.5 text-white" />
              ) : (
                <Bot className="h-3.5 w-3.5 text-white" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-tr-sm bg-[#2b2b2b] text-white"
                  : "rounded-tl-sm bg-[#f7f5f2] text-[#2b2b2b]"
              }`}
            >
              {msg.content || (
                <span className="flex items-center gap-1 text-[#2b2b2b]/40 text-xs">
                  <Loader2 className="h-3 w-3 animate-spin" /> yazıyor...
                </span>
              )}
            </div>
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#d86f3d]">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-[#f7f5f2] px-3 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-[#d86f3d]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-black/8 px-3 py-3">
        <div className="flex items-end gap-2 rounded-2xl border border-black/10 bg-[#faf9f7] px-3 py-2 focus-within:border-[#d86f3d] transition">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Mesajını yaz... (Enter = gönder)"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-[#2b2b2b] placeholder:text-[#2b2b2b]/40 outline-none"
            style={{ maxHeight: "140px" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#d86f3d] text-white transition hover:bg-[#c75f30] disabled:opacity-40"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-[#2b2b2b]/30">
          Shift+Enter ile yeni satır ekle
        </p>
      </div>
    </div>
  );
}

// ─── Ana sayfa ─────────────────────────────────────────────────────────────
export default function AiPage() {
  const aiProviders = providers.filter((p) => p.category === "ai");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <PageLayout
      title="AI"
      description="LLM, inference, embedding ve yapay zeka servislerini keşfet."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {aiProviders.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      {/* Floating chat button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#d86f3d] px-5 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#c75f30] hover:shadow-xl active:scale-95"
        >
          <Bot className="h-5 w-5" />
          AI ile Sohbet Et
          <span className="ml-1 flex h-2 w-2 rounded-full bg-green-400">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </PageLayout>
  );
}