"use client";

import { useRouter } from "next/navigation";

type HomeHeroProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function HomeHero({ search, onSearchChange }: HomeHeroProps) {
  const router = useRouter();

  return (
    <section className="relative min-h-[560px] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1920&q=80')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[#0d1b2a]/70" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-5xl flex-col items-center justify-center px-6 pt-20 text-center">
        <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
          Tüm Ücretsiz Geliştirici Araçları Tek Yerde
        </h1>

        <p className="mt-5 max-w-2xl text-sm font-medium text-white/85 md:text-base">
          API&apos;ler, açık kaynak projeler ve ücretsiz servisleri keşfet
        </p>

        <div className="mt-8 w-full max-w-xl">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="API veya araç ara..."
            className="w-full rounded-lg border border-white/20 bg-white px-5 py-4 text-sm text-[#1f2937] shadow-xl outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => router.push("/categories")}
            className="rounded-full bg-[#d86f3d] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[#c75f30]"
          >
            Keşfet
          </button>

          <button
            onClick={() => router.push("/apis")}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f2937] shadow-md transition hover:scale-105 hover:bg-gray-100"
          >
            Ücretsiz Başla
          </button>
        </div>
      </div>
    </section>
  );
}