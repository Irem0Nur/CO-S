"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/apis", label: "API'ler" },
  { href: "/database", label: "Veritabanı" },
  { href: "/categories", label: "Kategoriler" },
  { href: "/blog", label: "Blog" },
  { href: "/ai", label: "AI" },
  { href: "/contact", label: "İletişim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="KOI'S Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-white">KOI&apos;S</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop — auth alanı */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Giriş Yap
          </Link>

          <Link
            href="/sign-up"
            className="rounded-full bg-[#d86f3d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c75f30]"
          >
            Kaydol
          </Link>

          {/* Giriş yapılmışsa profil avatarı */}
          {isLoaded && isSignedIn && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-full ring-2 ring-[#d86f3d] ring-offset-2 ring-offset-transparent",
                },
              }}
            />
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-2xl text-white transition hover:bg-white/10 md:hidden"
          aria-label="Menüyü aç"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0d1b2a]/95 px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-white/85">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Giriş Yap
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#d86f3d] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#c75f30]"
            >
              Kaydol
            </Link>

            {/* Mobil — giriş yapılmışsa profil avatarı */}
            {isLoaded && isSignedIn && (
              <div className="flex items-center gap-3 px-3 pt-1">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-full ring-2 ring-[#d86f3d] ring-offset-2 ring-offset-transparent",
                    },
                  }}
                />
                <span className="text-sm text-white/70">Profilim</span>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}