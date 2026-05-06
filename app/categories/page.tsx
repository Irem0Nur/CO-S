"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { categories, providers, Category } from "@/data/providers";

const categoryInfo: Record<Category, string> = {
  ai: "Yapay zeka, LLM, embedding, görsel üretim ve inference servislerini içerir.",
  hosting: "Frontend, backend, static site ve serverless deployment servislerini içerir.",
  database: "PostgreSQL, MongoDB, Redis, SQLite ve serverless veritabanı çözümlerini içerir.",
  storage: "Dosya, görsel, obje depolama ve S3 uyumlu storage servislerini içerir.",
  auth: "Giriş yapma, kullanıcı yönetimi, OAuth, magic link ve MFA servislerini içerir.",
  email: "Transactional email, SMTP ve geliştirici odaklı e-posta API servislerini içerir.",
  monitoring: "Hata takibi, uptime monitoring, analytics, log ve observability araçlarını içerir.",
  cdn: "CDN, edge, DNS, statik dosya dağıtımı ve performans servislerini içerir.",
};

export default function CategoriesPage() {
  const [selected, setSelected] = useState<Category | null>(null);

  const selectedCategory = categories.find((cat) => cat.id === selected);
  const selectedProviders = providers.filter((p) => p.category === selected);

  return (
    <PageLayout
      title="Kategoriler"
      description="Tüm geliştirici kaynaklarını kategori kategori incele."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const count = providers.filter(
            (p) => p.category === category.id
          ).length;

          return (
            <button
              key={category.id}
              onClick={() =>
                setSelected(selected === category.id ? null : category.id)
              }
              className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">{category.emoji}</div>

              <h2 className="mt-4 text-xl font-semibold text-[#2b2b2b]">
                {category.label}
              </h2>

              <p className="mt-2 text-sm text-[#2b2b2b]/60">
                {count} kaynak
              </p>
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <section className="mt-10 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="text-4xl">{selectedCategory.emoji}</div>

            <div>
              <h2 className="text-2xl font-semibold text-[#2b2b2b]">
                {selectedCategory.label}
              </h2>
              <p className="mt-1 text-sm text-[#2b2b2b]/60">
                {categoryInfo[selectedCategory.id]}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-black/10 bg-[#f7f5f2] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <h3 className="font-semibold text-[#2b2b2b]">
                  {provider.name}
                </h3>

                <p className="mt-2 text-sm text-[#2b2b2b]/60">
                  {provider.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1 text-xs text-[#2b2b2b]/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}