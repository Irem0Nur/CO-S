import { Shield, Sparkles, Zap } from "lucide-react";

export default function FeatureStats() {
  return (
    <section className="bg-[#f7f5f2] py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        
        {/* Ücretsiz API */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d86f3d]/10">
            <Sparkles className="h-6 w-6 text-[#d86f3d]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#2b2b2b]">
            1000+ Ücretsiz API
          </h3>
          <p className="text-sm text-[#2b2b2b]/60">
            Projeleriniz için binlerce ücretsiz API&apos;ye erişin
          </p>
        </div>

        {/* Güvenilir */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d86f3d]/10">
            <Shield className="h-6 w-6 text-[#d86f3d]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#2b2b2b]">
            Güvenilir Kaynaklar
          </h3>
          <p className="text-sm text-[#2b2b2b]/60">
            Topluluk tarafından doğrulanmış ve test edilmiş
          </p>
        </div>

        {/* Hızlı */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d86f3d]/10">
            <Zap className="h-6 w-6 text-[#d86f3d]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#2b2b2b]">
            Hızlı Entegrasyon
          </h3>
          <p className="text-sm text-[#2b2b2b]/60">
            Kod örnekleri ve dokümantasyon ile hızlıca başlayın
          </p>
        </div>

      </div>
    </section>
  );
}