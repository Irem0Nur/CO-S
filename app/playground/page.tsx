"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { HF_MODELS } from "@/lib/hf-client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MODELS = Object.entries(HF_MODELS).map(([key, v]) => ({ key, ...v }));

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [modelKey, setModelKey] = useState("mistral-7b");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, modelKey }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Bilinmeyen hata");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + delta,
                };
                return updated;
              });
            }
          } catch {
            // malformed chunk
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(e as unknown as FormEvent);
    }
  }

  const activeModel = MODELS.find((m) => m.key === modelKey)!;

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#2a2a3a] bg-[#0a0a0f]/90 backdrop-blur-sm shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-lg">🆓</span>
              <span className="font-bold text-[#f0f0ff]">DevÜcretsiz</span>
            </Link>
            <span className="text-[#2a2a3a]">/</span>
            <span className="text-sm text-[#8888aa] flex items-center gap-1.5">
              <span>🤖</span> AI Playground
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg bg-[#111118] border border-[#2a2a3a] text-[#8888aa]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hugging Face
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Model Selector */}
      <div className="border-b border-[#2a2a3a] bg-[#111118] shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {MODELS.map((m) => (
            <button
              key={m.key}
              onClick={() => setModelKey(m.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                modelKey === m.key
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                  : "bg-transparent border-transparent text-[#8888aa] hover:text-[#f0f0ff] hover:border-[#2a2a3a]"
              }`}
            >
              <span className={m.color}>●</span>
              {m.label}
              <span className="text-[10px] opacity-60">{m.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h2 className="text-xl font-semibold text-[#f0f0ff] mb-2">AI Playground</h2>
              <p className="text-[#8888aa] text-sm max-w-sm mb-6">
                Hugging Face modelleriyle sohbet et. Tamamen ücretsiz ve sınırsız.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Merhaba, nasılsın?",
                  "Python ile REST API nasıl yazılır?",
                  "Fibonacci sayılarını hesapla",
                  "React hooks nedir, açıkla",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#111118] border border-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0ff] hover:border-indigo-500/40 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-sm shrink-0 mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-indigo-500/20 border border-indigo-500/30 text-[#f0f0ff]"
                      : "bg-[#111118] border border-[#2a2a3a] text-[#e0e0f0]"
                  }`}
                >
                  {msg.content}
                  {msg.role === "assistant" &&
                    loading &&
                    i === messages.length - 1 &&
                    msg.content === "" && (
                      <span className="inline-flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-[#2a2a3a] flex items-center justify-center text-sm shrink-0 mt-0.5">
                    👤
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#2a2a3a] bg-[#0a0a0f] shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <form onSubmit={send} className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Mesajını yaz... (Enter gönder, Shift+Enter yeni satır)"
                rows={1}
                className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-[#2a2a3a] text-[#f0f0ff] placeholder-[#8888aa] text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-all"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-all flex items-center gap-2 shrink-0"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
              Gönder
            </button>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                className="px-3 py-3 rounded-xl bg-[#111118] border border-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0ff] text-sm transition-all shrink-0"
                title="Sohbeti temizle"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </form>
          <p className="text-center text-[10px] text-[#444456] mt-2">
            Aktif model:{" "}
            <span className={`font-medium ${activeModel.color}`}>{activeModel.label}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
