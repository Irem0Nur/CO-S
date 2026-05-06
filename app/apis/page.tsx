"use client";

import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/data/providers";
import { Plus, Search, KeyRound, Copy, Star, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";

type CreatedApi = {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  key: string;
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
};

type ReviewsMap = Record<string, Review[]>;

function generateApiKey() {
  const random = Math.random().toString(36).slice(2);
  const time = Date.now().toString(36);
  return `koi_${time}_${random}`;
}

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const [hovered, setHovered] = useState(0);
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hovered || value) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={readonly ? "cursor-default" : "cursor-pointer"}
          >
            <Star
              className={`${dim} transition-colors ${
                filled
                  ? "fill-[#d86f3d] text-[#d86f3d]"
                  : "fill-transparent text-[#2b2b2b]/20"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function ReviewSection({ targetId }: { targetId: string }) {
  const [reviewsMap, setReviewsMap] = useState<ReviewsMap>({});
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const reviews = reviewsMap[targetId] ?? [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  function submitReview() {
    if (!rating || !comment.trim()) return;

    const newReview: Review = {
      id: crypto.randomUUID(),
      rating,
      comment: comment.trim(),
      author: author.trim() || "Anonim",
      date: new Date().toLocaleDateString("tr-TR"),
    };

    setReviewsMap((prev) => ({
      ...prev,
      [targetId]: [newReview, ...(prev[targetId] ?? [])],
    }));

    setRating(0);
    setComment("");
    setAuthor("");
  }

  return (
    <div className="mt-3 border-t border-black/8 pt-3">
      {/* Summary row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <div className="flex items-center gap-2">
          <StarRating value={Math.round(avgRating)} readonly size="sm" />
          <span className="text-xs text-[#2b2b2b]/50">
            {reviews.length > 0
              ? `${avgRating.toFixed(1)} · ${reviews.length} yorum`
              : "Henüz yorum yok"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#d86f3d]">
          <MessageSquare className="h-3.5 w-3.5" />
          {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {/* Add review form */}
          <div className="rounded-xl border border-black/8 bg-[#faf9f7] p-3 space-y-2">
            <p className="text-xs font-medium text-[#2b2b2b]/70">Değerlendirme yap</p>
            <StarRating value={rating} onChange={setRating} />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Adın (isteğe bağlı)"
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#d86f3d]"
            />
            <div className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitReview()}
                placeholder="Yorumunu yaz..."
                className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#d86f3d]"
              />
              <button
                type="button"
                onClick={submitReview}
                disabled={!rating || !comment.trim()}
                className="flex items-center gap-1 rounded-lg bg-[#d86f3d] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#c75f30] disabled:opacity-40"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Review list */}
          {reviews.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-black/8 bg-white p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#2b2b2b]">
                      {r.author}
                    </span>
                    <span className="text-[10px] text-[#2b2b2b]/40">{r.date}</span>
                  </div>
                  <StarRating value={r.rating} readonly size="sm" />
                  <p className="mt-1 text-xs text-[#2b2b2b]/70">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ApisPage() {
  const [search, setSearch] = useState("");
  const [apiName, setApiName] = useState("");
  const [apiDescription, setApiDescription] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [createdApis, setCreatedApis] = useState<CreatedApi[]>([]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return providers;

    return providers.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.freeDetails.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
      );
    });
  }, [search]);

  function createApi() {
    if (!apiName.trim()) return;

    const newApi: CreatedApi = {
      id: crypto.randomUUID(),
      name: apiName,
      description:
        apiDescription || "KOI'S üzerinden oluşturulan özel API.",
      endpoint: apiEndpoint || "/api/custom",
      key: generateApiKey(),
    };

    setCreatedApis((prev) => [newApi, ...prev]);
    setApiName("");
    setApiDescription("");
    setApiEndpoint("");
  }

  async function copyKey(key: string) {
    await navigator.clipboard.writeText(key);
  }

  return (
    <PageLayout
      title="API'ler"
      description="Ücretsiz API servislerini keşfet ve kendi API anahtarını oluştur."
    >
      <section className="mb-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#2b2b2b]">
              <KeyRound className="h-6 w-6 text-[#d86f3d]" />
              Kendi API&apos;ni Oluştur
            </h2>
            <p className="mt-2 text-sm text-[#2b2b2b]/60">
              API adını, açıklamasını ve endpoint bilgisini girerek örnek bir API key oluştur.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <input
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            placeholder="API adı"
            className="rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#d86f3d]"
          />

          <input
            value={apiDescription}
            onChange={(e) => setApiDescription(e.target.value)}
            placeholder="Kısa açıklama"
            className="rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#d86f3d]"
          />

          <input
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            placeholder="/api/ornek-endpoint"
            className="rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#d86f3d]"
          />

          <button
            onClick={createApi}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#d86f3d] px-5 py-3 font-semibold text-white transition hover:bg-[#c75f30]"
          >
            <Plus className="h-4 w-4" />
            API Oluştur
          </button>
        </div>

        {createdApis.length > 0 && (
          <div className="mt-6 space-y-3">
            {createdApis.map((api) => (
              <div
                key={api.id}
                className="rounded-2xl border border-black/10 bg-[#f7f5f2] p-4"
              >
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h3 className="font-semibold text-[#2b2b2b]">
                      {api.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#2b2b2b]/60">
                      {api.description}
                    </p>
                    <p className="mt-1 text-xs text-[#2b2b2b]/50">
                      Endpoint: {api.endpoint}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-[#2b2b2b]/70">
                    <code>{api.key}</code>
                    <button
                      onClick={() => copyKey(api.key)}
                      className="rounded-lg p-1 text-[#d86f3d] hover:bg-[#fff3ec]"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* ⭐ Review section for created API cards */}
                <ReviewSection targetId={api.id} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold text-[#2b2b2b]">
          Tüm API Siteleri
        </h2>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2b2b2b]/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="API adı, kategori veya teknoloji ara..."
            className="w-full rounded-xl border border-black/10 py-3 pl-12 pr-4 outline-none focus:border-[#d86f3d]"
          />
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
          <p className="text-[#2b2b2b]/60">Sonuç bulunamadı 😕</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((provider) => (
            <div key={provider.id} className="flex flex-col rounded-3xl border border-black/10 bg-white shadow-sm overflow-hidden">
              <ProviderCard provider={provider} />
              {/* ⭐ Review section for provider cards */}
              <div className="px-5 pb-4">
                <ReviewSection targetId={provider.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}