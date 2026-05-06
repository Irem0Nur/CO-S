"use client";

import { ExternalLink, Lock, Unlock } from "lucide-react";
import { Provider } from "@/data/providers";

interface Props {
  provider: Provider;
}

export default function ProviderCard({ provider }: Props) {
  return (
    <a
      href={provider.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c46a3a]/30 hover:shadow-xl"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[#2b2b2b] transition group-hover:text-[#c46a3a]">
            {provider.name}
          </h3>
          {provider.highlight && (
            <p className="mt-1 text-xs font-medium text-[#c46a3a]">
              {provider.highlight}
            </p>
          )}
        </div>

        <div className="rounded-lg bg-[#f7f5f2] p-2 text-[#2b2b2b]/40">
          {provider.noCardRequired ? (
            <Unlock className="h-4 w-4" />
          ) : (
            <Lock className="h-4 w-4" />
          )}
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#2b2b2b]/60">
        {provider.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          Ücretsiz
        </span>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            provider.noCardRequired
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-orange-200 bg-orange-50 text-orange-700"
          }`}
        >
          {provider.noCardRequired ? "Kart gerekmez" : "Kart gerekebilir"}
        </span>

        {provider.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/10 bg-[#f7f5f2] px-3 py-1 text-xs font-medium text-[#2b2b2b]/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4 rounded-lg border border-black/10 bg-[#f7f5f2] p-3">
        <p className="line-clamp-2 text-xs leading-relaxed text-[#2b2b2b]/60">
          {provider.freeDetails}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-[#2b2b2b]/50">
        <span>{provider.noCardRequired ? "Auth yok / kolay başlangıç" : "Hesap veya kart gerekebilir"}</span>
        <span className="flex items-center gap-1 text-[#c46a3a]">
          Aç <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}