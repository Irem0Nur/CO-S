import Link from "next/link";
import { Lock, Unlock } from "lucide-react";
import type { Provider } from "@/data/providers";

type PopularApisProps = {
  providers: Provider[];
};

export default function PopularApis({ providers }: PopularApisProps) {
  const popular = providers.slice(0, 3);

  return (
    <section id="apis" className="bg-[#f1eee9] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-[#2b2b2b]">
            Popüler API&apos;ler
          </h2>
          <p className="mt-2 text-sm text-[#2b2b2b]/60">
            En çok kullanılan ücretsiz API&apos;leri keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {popular.map((provider) => (
            <a
              key={provider.id}
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="font-semibold text-[#2b2b2b]">
                  {provider.name}
                </h3>

                {provider.noCardRequired ? (
                  <Unlock className="h-4 w-4 text-[#2b2b2b]/40" />
                ) : (
                  <Lock className="h-4 w-4 text-[#2b2b2b]/40" />
                )}
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-[#2b2b2b]/60">
                {provider.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  Ücretsiz
                </span>

                {provider.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-[#2b2b2b]/50">
                <span>
                  {provider.noCardRequired
                    ? "API key veya kart gerekmez"
                    : "Hesap/kart gerekebilir"}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/apis"
            className="text-sm font-semibold text-[#d86f3d] hover:underline"
          >
            Tüm API&apos;leri Gör →
          </Link>
        </div>
      </div>
    </section>
  );
}