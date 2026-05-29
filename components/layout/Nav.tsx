"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";
import { useTheme } from "@/components/ThemeProvider";

type Lang = "en" | "es";

interface NavProps {
  lang: Lang;
  t: Translations["nav"];
}

export function Nav({ lang, t }: NavProps) {
  const router = useRouter();
  const otherLang = lang === "en" ? "es" : "en";
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  function switchLang() {
    document.cookie = `lang=${otherLang};path=/;max-age=31536000`;
    router.push(`/${otherLang}/`);
  }

  const navLinks = [
    { key: "launchpad" as const, href: `/${lang}/#launchpad` },
    { key: "tutorials" as const, href: `/${lang}/tutorials` },
    { key: "aiTools" as const, href: `/${lang}/ai-tools` },
    { key: "community" as const, href: `/${lang}/#community` },
    { key: "consulting" as const, href: `/${lang}/#consulting` },
    { key: "marketplace" as const, href: `/${lang}/marketplace` },
  ];

  const isDark = theme === "dark";

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 px-5 md:px-12 py-5 transition-colors`}
      style={{
        background: isDark
          ? "linear-gradient(to bottom, rgba(5,10,20,0.9) 0%, transparent 100%)"
          : "rgba(245,244,240,0.97)",
        borderBottom: isDark ? "none" : "1px solid rgba(8,13,20,0.08)",
      }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          href={`/${lang}/`}
          className={`font-sans font-black text-xl tracking-tight ${isDark ? "text-white" : "text-opc-dark"}`}
        >
          OPC<span className="text-opc-orange">America</span>
        </Link>

        {/* Desktop nav links */}
        <div className={`hidden md:flex gap-8 font-sans text-sm ${isDark ? "text-white/70" : "text-opc-dark/60"}`}>
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-opc-dark"}`}
            >
              {t[key]}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex gap-3 items-center font-sans text-sm">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
              isDark
                ? "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                : "border-opc-dark/20 text-opc-dark/60 hover:text-opc-dark hover:border-opc-dark/40"
            }`}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            onClick={switchLang}
            className={`border px-4 py-1.5 rounded-full text-xs transition-colors ${
              isDark
                ? "border-white/30 text-white/75 hover:text-white"
                : "border-opc-dark/30 text-opc-dark/75 hover:text-opc-dark"
            }`}
          >
            🌐 {t.langToggle}
          </button>
          <Link
            href={`/${lang}/signin`}
            className={`transition-colors ${isDark ? "text-white/70 hover:text-white" : "text-opc-dark/70 hover:text-opc-dark"}`}
          >
            {t.signIn}
          </Link>
          <Link
            href={`/${lang}/join`}
            className="bg-opc-orange text-white px-5 py-2 rounded-lg font-bold hover:bg-opc-orange/90 transition-colors"
          >
            {t.joinFree}
          </Link>
        </div>

        {/* Mobile: theme + lang + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
              isDark
                ? "border-white/20 text-white/60"
                : "border-opc-dark/20 text-opc-dark/60"
            }`}
          >
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button
            onClick={switchLang}
            className={`border px-3 py-1 rounded-full text-xs ${
              isDark ? "border-white/30 text-white/75" : "border-opc-dark/30 text-opc-dark/75"
            }`}
          >
            🌐 {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-1 ${isDark ? "text-white/80 hover:text-white" : "text-opc-dark/80 hover:text-opc-dark"}`}
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
        <div
          className={`md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-4 ${
            isDark ? "border-white/10" : "border-opc-dark/10"
          }`}
        >
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`font-sans text-sm transition-colors ${
                isDark ? "text-white/70 hover:text-white" : "text-opc-dark/70 hover:text-opc-dark"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t[key]}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <Link
              href={`/${lang}/signin`}
              className={`font-sans text-sm ${isDark ? "text-white/60" : "text-opc-dark/60"}`}
            >
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
