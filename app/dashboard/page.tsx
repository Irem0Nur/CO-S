"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

export default function Dashboard() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    setLoading(true);
    const res = await fetch("/api/keys");
    const data = await res.json();
    setKeys(data);
    setLoading(false);
  }

  async function createKey() {
    if (!newName.trim()) return;
    setCreating(true);
    await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setNewName("");
    setShowForm(false);
    setCreating(false);
    fetchKeys();
  }

  async function deleteKey(id: string) {
    if (!confirm("Bu API key'i silmek istediğine emin misin?")) return;
    await fetch("/api/keys", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchKeys();
  }

  function maskKey(key: string) {
    return key.slice(0, 8) + "••••••••••••••••••••••••••••••••••••••••";
  }

  async function copyKey(key: string) {
    await navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#2a2a3a] bg-[#0a0a0f]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-lg">🆓</span>
              <span className="font-bold text-[#f0f0ff]">DevÜcretsiz</span>
            </Link>
            <span className="text-[#2a2a3a]">/</span>
            <span className="text-sm text-[#8888aa]">🔑 API Keys</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/playground"
              className="text-xs px-3 py-1.5 rounded-lg bg-[#111118] border border-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0ff] transition-all"
            >
              🤖 Playground
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f0f0ff] mb-2">API Keys</h1>
          <p className="text-[#8888aa] text-sm">
            Kendi uygulamanızda kullanmak için API key oluşturun. OpenAI formatıyla uyumludur.
          </p>
        </div>

        {/* Kullanım kutusu */}
        <div className="mb-8 p-5 rounded-xl bg-[#111118] border border-[#2a2a3a]">
          <p className="text-xs font-semibold text-[#8888aa] uppercase tracking-wider mb-3">Nasıl kullanılır?</p>
          <pre className="text-xs text-emerald-300 overflow-x-auto leading-relaxed">{`curl https://devucretsiz.vercel.app/api/v1/chat/completions \\
  -H "Authorization: Bearer sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mistral-7b",
    "messages": [{"role": "user", "content": "Merhaba!"}]
  }'`}</pre>
          <p className="text-xs text-[#8888aa] mt-3">
            Desteklenen modeller:{" "}
            {["mistral-7b", "llama-3-8b", "zephyr-7b", "qwen2-7b", "deepseek-coder"].map((m) => (
              <span key={m} className="inline-block mr-2 px-1.5 py-0.5 rounded bg-[#2a2a3a] text-[#f0f0ff] font-mono">
                {m}
              </span>
            ))}
          </p>
        </div>

        {/* Key listesi */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#f0f0ff]">Oluşturulan Keyler</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Key Oluştur
          </button>
        </div>

        {/* Yeni key formu */}
        {showForm && (
          <div className="mb-4 p-4 rounded-xl bg-[#111118] border border-indigo-500/30">
            <p className="text-sm font-medium text-[#f0f0ff] mb-3">Key İsmi</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="örn. Kişisel proje, Test"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createKey()}
                autoFocus
                className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#2a2a3a] text-[#f0f0ff] placeholder-[#8888aa] text-sm focus:outline-none focus:border-indigo-500/60"
              />
              <button
                onClick={createKey}
                disabled={creating || !newName.trim()}
                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white text-sm font-medium transition-all"
              >
                {creating ? "Oluşturuluyor..." : "Oluştur"}
              </button>
              <button
                onClick={() => { setShowForm(false); setNewName(""); }}
                className="px-3 py-2 rounded-lg bg-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0ff] text-sm transition-all"
              >
                İptal
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-[#8888aa] text-sm">Yükleniyor...</div>
        ) : keys.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#2a2a3a] rounded-xl">
            <p className="text-3xl mb-3">🔑</p>
            <p className="text-[#f0f0ff] font-medium mb-1">Henüz API key yok</p>
            <p className="text-[#8888aa] text-sm">İlk key'ini oluşturmak için butona bas</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {keys.map((k) => (
              <div
                key={k.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#111118] border border-[#2a2a3a] hover:border-[#3a3a4a] transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f0f0ff] mb-1">{k.name}</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-[#8888aa] font-mono">
                      {revealed[k.id] ? k.key : maskKey(k.key)}
                    </code>
                    <button
                      onClick={() => setRevealed((p) => ({ ...p, [k.id]: !p[k.id] }))}
                      className="text-[10px] text-[#8888aa] hover:text-[#f0f0ff] transition-colors"
                    >
                      {revealed[k.id] ? "Gizle" : "Göster"}
                    </button>
                  </div>
                  <p className="text-[10px] text-[#444456] mt-1">
                    Oluşturuldu: {new Date(k.created_at).toLocaleDateString("tr-TR")}
                    {k.last_used_at && ` · Son kullanım: ${new Date(k.last_used_at).toLocaleDateString("tr-TR")}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyKey(k.key)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] text-[#8888aa] hover:text-[#f0f0ff] text-xs transition-all"
                  >
                    {copied === k.key ? "✓ Kopyalandı" : "Kopyala"}
                  </button>
                  <button
                    onClick={() => deleteKey(k.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-all"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
