import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="KOI'S Logo" width={40} height={40} />
              <h2 className="text-2xl font-bold">KOI&apos;S</h2>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
              Yazılımcılar için ücretsiz API&apos;ler, providerlar, açık kaynak araçlar ve geliştirici kaynaklarını tek yerde toplayan platform.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-[#d86f3d] hover:bg-[#d86f3d] hover:text-white"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.6 10.7.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.2 2.8 1.6.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1a10.5 10.5 0 0 1 5.4 0c2.1-.4 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.7 5.3-5.3 5.6.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.7C23.2 5.4 18.3.5 12 .5z" />
                </svg>
                GitHub
              </a>

              <a
                href="mailto:contact@kois.dev"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-[#d86f3d] hover:bg-[#d86f3d] hover:text-white"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 13.5 0 6.75V18a2.25 2.25 0 0 0 2.25 2.25h19.5A2.25 2.25 0 0 0 24 18V6.75L12 13.5z" />
                  <path d="M12 10.5 24 3.75H0L12 10.5z" />
                </svg>
                Mail
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Platform</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link href="/apis" className="transition hover:text-white">API&apos;ler</Link></li>
              <li><Link href="/database" className="transition hover:text-white">Veritabanı</Link></li>
              <li><Link href="/categories" className="transition hover:text-white">Kategoriler</Link></li>
              <li><Link href="/ai" className="transition hover:text-white">AI</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Kaynaklar</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link href="/blog" className="transition hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="transition hover:text-white">Provider öner</Link></li>
              <li><Link href="/apis" className="transition hover:text-white">Ücretsiz API bul</Link></li>
              <li><Link href="/database" className="transition hover:text-white">Database alternatifleri</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Hesap</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link href="/sign-in" className="transition hover:text-white">Giriş Yap</Link></li>
              <li><Link href="/sign-up" className="transition hover:text-white">Kaydol</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Yeni ücretsiz kaynaklardan haberdar ol
              </h3>
              <p className="mt-1 text-sm text-white/60">
                API, provider ve açık kaynak araç güncellemelerini takip et.
              </p>
            </div>

            <form className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <input
                type="email"
                placeholder="E-posta adresin"
                className="min-w-[260px] rounded-full border border-white/10 bg-white px-4 py-3 text-sm text-[#2b2b2b] outline-none"
              />

              <button
                type="button"
                className="rounded-full bg-[#d86f3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c75f30]"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} KOI&apos;S Platform. Tüm hakları saklıdır.</p>

          <div className="flex items-center gap-5">
            <Link href="/contact" className="transition hover:text-white">İletişim</Link>
            <Link href="/blog" className="transition hover:text-white">Blog</Link>
            <Link href="/apis" className="transition hover:text-white">API&apos;ler</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}