"use client";

import { useMemo, useState } from "react";
import ChatBox from "@/components/ChatBox";
import { Category, categories, providers } from "@/data/providers";
import ProviderCard from "./ProviderCard";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

export default function MainContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [noCardOnly, setNoCardOnly] = useState(false);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: providers.length };

    categories.forEach((cat) => {
      result[cat.id] = providers.filter((p) => p.category === cat.id).length;
    });

    return result;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return providers.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (noCardOnly && !p.noCardRequired) return false;
      if (!q) return true;

      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.freeDetails.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategory, noCardOnly]);

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#2b2b2b]">
      <header className="border-b border-black/10 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#c46a3a]">KOI&apos;S</h1>
            <p className="text-sm text-[#2b2b2b]/60">
              Developer Platform
            </p>
          </div>

          <div className="text-sm text-[#2b2b2b]/60">
            {providers.length} ücretsiz kaynak
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="mx-auto max-w-3xl text-5xl font-bold leading-tight">
          Ücretsiz API ve Developer Kaynakları Tek Yerde
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-[#2b2b2b]/60">
          AI, hosting, veritabanı, auth, e-posta, CDN ve açık kaynak servisleri keşfet.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
            counts={counts}
          />

          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
            <button
              onClick={() => setNoCardOnly(!noCardOnly)}
              className={`rounded-xl px-4 py-2 text-sm font-medium ${
                noCardOnly
                  ? "bg-[#c46a3a] text-white"
                  : "bg-[#f7f5f2] text-[#2b2b2b]"
              }`}
            >
              Kart gerektirmeyenler
            </button>

            <p className="text-sm text-[#2b2b2b]/60">
              {filtered.length} kaynak bulundu
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 font-semibold">Sonuç bulunamadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </main>

      <ChatBox />
    </div>
  );
}