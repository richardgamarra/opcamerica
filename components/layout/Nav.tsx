"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

type Lang = "en" | "es";

interface NavProps {
  lang: Lang;
  t: Translations["nav"];
}

export function Nav({ lang, t }: NavProps) {
  const router = useRouter();
  const otherLang = lang === "en" ? "es" : "en";
  const [menuOpen, setMenuOpen] = useState(false);

  function switchLang() {
    document.cookie = `lang=${otherLang};path=/;max-age=31536000`;
    router.push(`/${otherLang}/`);
  }

  const navLinks = [
    { key: "launchpad" as const, href: `/${lang}/#launchpad` },
    { key: "tutorials" as const, href: `/${lang}/#tutorials` },
    { key: "aiTools" as const, href: `/${lang}/#ai-tools` },
    { key: "community" as const, href: `/${lang}/#community` },
    { key: "consulting" as const, href: `/${lang}/#consulting` },
  ];

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-10 px-5 md:px-12 py-5"
      style={{ background: "linear-gradient(to bottom, rgba(5,10,20,0.9) 0%, transparent 100%)" }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}/`} className="font-sans font-black text-xl tracking-tight text-white">
          OPC<span className="text-opc-orange">America</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 font-sans text-sm text-white/70">
          {navLinks.map(({ key, href }) => (
            <Link key={key} href={href} className="hover:text-white transition-colors">
              {t[key]}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex gap-3 items-center font-sans text-sm">
          <button
            onClick={switchLang}
            className="border border-white/30 px-4 py-1.5 rounded-full text-white/75 hover:text-white transition-colors text-xs"
          >
            🌐 {t.langToggle}
          </button>
          <Link href={`/${lang}/signin`} className="text-white/70 hover:text-white">
            {t.signIn}
          </Link>
          <Link
            href={`/${lang}/join`}
            className="bg-opc-orange text-white px-5 py-2 rounded-lg font-bold hover:bg-opc-orange/90 transition-colors"
          >
            {t.joinFree}
          </Link>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={switchLang}
            className="border border-white/30 px-3 py-1 rounded-full text-white/75 text-xs"
          >
            🌐 {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/80 hover:text-white p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-4">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="font-sans text-sm text-white/70 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {t[key]}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <Link href={`/${lang}/signin`} className="font-sans text-sm text-white/60">
              {t.signIn}
            </Link>
            <Link
              href={`/${lang}/join`}
              className="bg-opc-orange text-white font-sans font-bold text-sm px-5 py-2 rounded-lg"
            >
              {t.joinFree}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
