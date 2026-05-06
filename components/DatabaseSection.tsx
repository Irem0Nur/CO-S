import Link from "next/link";

export default function DatabaseSection() {
  return (
    <section id="database" className="bg-[#f7f5f2] py-20">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-[#2b2b2b]">
            Ücretsiz Veritabanları
          </h2>
          <p className="mt-2 text-sm text-[#2b2b2b]/60">
            Projeniz için ideal veritabanı çözümünü bulun
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* SQL */}
          <div className="rounded-xl border border-black/10 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-xl font-bold text-blue-600">SQL</h3>
            <p className="mt-2 text-sm text-[#2b2b2b]/60">
              İlişkisel
            </p>
            <p className="mt-3 text-xs text-[#2b2b2b]/50">
              PostgreSQL, MySQL ve daha fazlası
            </p>
          </div>

          {/* NoSQL */}
          <div className="rounded-xl border border-black/10 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-xl font-bold text-green-600">NoSQL</h3>
            <p className="mt-2 text-sm text-[#2b2b2b]/60">
              Döküman Tabanlı
            </p>
            <p className="mt-3 text-xs text-[#2b2b2b]/50">
              MongoDB, Firebase ve daha fazlası
            </p>
          </div>

          {/* Free */}
          <div className="rounded-xl border border-black/10 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-xl font-bold text-purple-600">Free</h3>
            <p className="mt-2 text-sm text-[#2b2b2b]/60">
              Ücretsiz Planlar
            </p>
            <p className="mt-3 text-xs text-[#2b2b2b]/50">
              Küçük projeler için ücretsiz seçenekler
            </p>
          </div>

        </div>

        <div className="mt-10 text-center">
          <Link
            href="/database"
            className="text-sm font-semibold text-[#d86f3d] hover:underline"
          >
            Tüm Veritabanlarını Gör →
          </Link>
        </div>

      </div>
    </section>
  );
}