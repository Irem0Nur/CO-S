"use client";

import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";

const databaseItems = [
  {
    name: "Supabase",
    url: "https://supabase.com",
    type: "SQL",
    desc: "Açık kaynak Firebase alternatifi. PostgreSQL tabanlı.",
    features: ["500MB veritabanı", "Unlimited API requests", "50K MAU"],
    popular: true,
    noCard: true,
  },
  {
    name: "MongoDB Atlas",
    url: "https://www.mongodb.com/atlas",
    type: "NoSQL",
    desc: "Bulut tabanlı MongoDB servisi. Esnek doküman veritabanı.",
    features: ["512MB depolama", "Shared RAM", "Unlimited connections"],
    popular: true,
    noCard: false,
  },
  {
    name: "Firebase Realtime Database",
    url: "https://firebase.google.com/products/realtime-database",
    type: "NoSQL",
    desc: "Google'ın gerçek zamanlı NoSQL veritabanı çözümü.",
    features: ["1GB depolama", "10GB transfer", "100 eş zamanlı bağlantı"],
    popular: true,
    noCard: true,
  },
  {
    name: "PlanetScale",
    url: "https://planetscale.com",
    type: "SQL",
    desc: "MySQL uyumlu, serverless veritabanı platformu.",
    features: ["5GB depolama", "1 milyar satır okuma/ay", "10 milyon satır yazma/ay"],
    popular: false,
    noCard: true,
  },
  {
    name: "Redis Cloud",
    url: "https://redis.io/cloud/",
    type: "NoSQL",
    desc: "Hızlı in-memory veritabanı ve cache çözümü.",
    features: ["30MB RAM", "30 bağlantı", "Yüksek hız"],
    popular: true,
    noCard: false,
  },
  {
    name: "CockroachDB",
    url: "https://www.cockroachlabs.com",
    type: "SQL",
    desc: "Dağıtık SQL veritabanı. PostgreSQL uyumlu.",
    features: ["5GB depolama", "250M Request Units/ay", "Otomatik yedekleme"],
    popular: false,
    noCard: true,
  },
  {
    name: "Fauna",
    url: "https://fauna.com",
    type: "NoSQL",
    desc: "Global dağıtık, serverless veritabanı.",
    features: ["5GB depolama", "100K okuma/gün", "50K yazma/gün"],
    popular: false,
    noCard: true,
  },
  {
    name: "Neon",
    url: "https://neon.tech",
    type: "SQL",
    desc: "Serverless Postgres. Otomatik ölçeklendirme.",
    features: ["3GB depolama", "Sınırsız veritabanı", "Otomatik suspend"],
    popular: false,
    noCard: true,
  },
  {
    name: "Turso",
    url: "https://turso.tech",
    type: "SQL",
    desc: "SQLite tabanlı edge veritabanı.",
    features: ["9GB depolama", "500 veritabanı", "1 milyar satır okuma"],
    popular: false,
    noCard: true,
  },
];

export default function DatabasePage() {
  const [search, setSearch] = useState("");
  const [dbType, setDbType] = useState<"all" | "SQL" | "NoSQL">("all");
  const [noCardOnly, setNoCardOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return databaseItems.filter((item) => {
      if (dbType !== "all" && item.type !== dbType) return false;
      if (noCardOnly && !item.noCard) return false;
      if (popularOnly && !item.popular) return false;

      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.features.join(" ").toLowerCase().includes(q)
      );
    });
  }, [search, dbType, noCardOnly, popularOnly]);

  return (
    <PageLayout
      title="Veritabanları"
      description="Projeniz için en iyi ücretsiz veritabanı çözümlerini keşfedin."
    >
      {/* ARAMA */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Veritabanı ara..."
          className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm outline-none shadow-sm focus:border-[#d86f3d]"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* SOL FİLTRE */}
        <aside className="h-fit rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">Filtreler</h2>

          <div className="space-y-2">
            <button
              onClick={() => setDbType("all")}
              className={`w-full rounded-xl px-4 py-2 text-left ${
                dbType === "all"
                  ? "bg-[#d86f3d] text-white"
                  : "hover:bg-[#f7f5f2]"
              }`}
            >
              Tümü
            </button>

            <button
              onClick={() => setDbType("SQL")}
              className={`w-full rounded-xl px-4 py-2 text-left ${
                dbType === "SQL"
                  ? "bg-[#d86f3d] text-white"
                  : "hover:bg-[#f7f5f2]"
              }`}
            >
              SQL
            </button>

            <button
              onClick={() => setDbType("NoSQL")}
              className={`w-full rounded-xl px-4 py-2 text-left ${
                dbType === "NoSQL"
                  ? "bg-[#d86f3d] text-white"
                  : "hover:bg-[#f7f5f2]"
              }`}
            >
              NoSQL
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={noCardOnly}
                onChange={(e) => setNoCardOnly(e.target.checked)}
              />
              Kart gerektirmeyen
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={popularOnly}
                onChange={(e) => setPopularOnly(e.target.checked)}
              />
              Popüler
            </label>
          </div>
        </aside>

        {/* KARTLAR */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {item.popular && (
                <span className="absolute -top-3 right-4 rounded-full bg-[#d86f3d] px-3 py-1 text-xs text-white">
                  Popüler
                </span>
              )}

              <h3 className="text-xl font-semibold">{item.name}</h3>

              <p className="mt-2 text-sm text-[#2b2b2b]/60">
                {item.desc}
              </p>

              <ul className="mt-4 space-y-1 text-sm">
                {item.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>

              <div className="mt-4 text-xs text-[#2b2b2b]/50">
                {item.noCard ? "Kart yok" : "Kart gerekebilir"}
              </div>
            </a>
          ))}
        </section>
      </div>
    </PageLayout>
  );
}