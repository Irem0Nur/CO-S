import PageLayout from "@/components/PageLayout";

export default function ContactPage() {
  return (
    <PageLayout
      title="İletişim"
      description="Öneri, katkı, hata bildirimi veya iş birliği için bize ulaş."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#2b2b2b]">
            Bize Mesaj Gönder
          </h2>
          <p className="mt-2 text-sm text-[#2b2b2b]/60">
            Eksik provider, yeni API önerisi veya geliştirme fikrini bizimle paylaş.
          </p>

          <form className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#2b2b2b]">
                  Ad Soyad
                </label>
                <input
                  className="w-full rounded-2xl border border-black/10 bg-[#f7f5f2] px-4 py-3 text-sm outline-none transition focus:border-[#d86f3d] focus:bg-white"
                  placeholder="Adın"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2b2b2b]">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-black/10 bg-[#f7f5f2] px-4 py-3 text-sm outline-none transition focus:border-[#d86f3d] focus:bg-white"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2b2b2b]">
                Konu
              </label>
              <select className="w-full rounded-2xl border border-black/10 bg-[#f7f5f2] px-4 py-3 text-sm outline-none transition focus:border-[#d86f3d] focus:bg-white">
                <option>Provider önerisi</option>
                <option>Hata bildirimi</option>
                <option>İş birliği</option>
                <option>Genel mesaj</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2b2b2b]">
                Mesaj
              </label>
              <textarea
                rows={6}
                className="w-full resize-none rounded-2xl border border-black/10 bg-[#f7f5f2] px-4 py-3 text-sm outline-none transition focus:border-[#d86f3d] focus:bg-white"
                placeholder="Mesajını yaz..."
              />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-[#d86f3d] px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#c75f30] hover:shadow-xl md:w-auto"
            >
              Mesajı Gönder
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-[#0d1b2a] p-8 text-white shadow-sm">
            <h3 className="text-2xl font-semibold">KOI&apos;S ile iletişim</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Platforma yeni kaynak eklemek, öneri göndermek veya geliştirme sürecine katkı vermek için bize yazabilirsin.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-white/50">E-posta</p>
                <p className="mt-1 font-medium">contact@kois.dev</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-white/50">Yanıt süresi</p>
                <p className="mt-1 font-medium">Genellikle 24-48 saat</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-white/50">Katkı</p>
                <p className="mt-1 font-medium">Provider, blog ve API önerileri</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-[#2b2b2b]">Hızlı öneri</h3>
            <p className="mt-2 text-sm text-[#2b2b2b]/60">
              Yeni bir ücretsiz API biliyorsan adını, linkini ve ücretsiz plan detayını göndermen yeterli.
            </p>
          </div>
        </aside>
      </div>
    </PageLayout>
  );
}