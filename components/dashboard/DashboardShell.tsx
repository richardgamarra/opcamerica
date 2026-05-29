"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { key: "overview",  label: "Overview",           labelEs: "Resumen",              icon: GridIcon,   href: "overview" },
  { key: "pulse",     label: "Daily Pulse",         labelEs: "Pulso Diario",         icon: PulseIcon,  href: "daily-pulse" },
  { key: "funding",   label: "Funding & Programs",  labelEs: "Fondos y Programas",   icon: BriefIcon,  href: "funding" },
  { key: "events",    label: "Events",              labelEs: "Eventos",              icon: CalIcon,    href: "events" },
  { key: "launches",  label: "My Launches",         labelEs: "Mis Lanzamientos",     icon: RocketIcon, href: "launches" },
  { key: "playbooks", label: "Playbooks",           labelEs: "Playbooks",            icon: BookIcon,   href: "playbooks" },
  { key: "perks",     label: "Perks",               labelEs: "Beneficios",           icon: GiftIcon,   href: "perks" },
  { key: "claims",    label: "My Claims",           labelEs: "Mis Reclamos",         icon: TagIcon,    href: "claims" },
  { key: "resources", label: "Resources",           labelEs: "Recursos",             icon: LibIcon,    href: "resources" },
  { key: "settings",  label: "Settings",            labelEs: "Configuración",        icon: CogIcon,    href: "settings" },
];

export function DashboardShell({ lang, children }: Props) {
  const pathname = usePathname();
  const isEs = lang === "es";

  function isActive(href: string) {
    return pathname.includes(`/dashboard/${href}`);
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col fixed top-0 bottom-0 left-0 z-40">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-gray-100">
          <Link href={`/${lang}/`} className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-opc-dark flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-black">OPC</span>
            </span>
            <div className="min-w-0">
              <span className="text-xs font-bold text-gray-700 tracking-wide">OPCAmerica</span>
              <span className="text-gray-200 mx-1">/</span>
              <span className="text-xs font-bold text-opc-orange">LaunchPad</span>
            </div>
          </Link>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
              RG
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">Rick Gama</p>
              <p className="text-xs text-gray-400">Free Plan</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ key, label, labelEs, icon: Icon, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={`/${lang}/dashboard/${href}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-opc-orange/8 text-opc-orange font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <Icon active={active} />
                {isEs ? labelEs : label}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade + Sign out */}
        <div className="px-3 pb-4 space-y-0.5 border-t border-gray-100 pt-3">
          <Link
            href={`/${lang}/join-elite`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-colors w-full"
          >
            <CrownIcon />
            {isEs ? "Mejorar Plan" : "Upgrade"}
          </Link>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors w-full">
            <SignOutIcon />
            {isEs ? "Cerrar sesión" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-700">LaunchPad</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href={`/${lang}/`} className="text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors">
              <HomeIcon />
              {isEs ? "Inicio" : "Home"}
            </Link>
            <Link href={`/${lang}/launchpad`} className="text-opc-orange hover:text-opc-orange/80 flex items-center gap-1.5 font-semibold transition-colors">
              <RocketSmIcon />
              LaunchPad
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-8 py-7 max-w-5xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---- Icon components ---- */
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}
function PulseIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}
function BriefIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  );
}
function CalIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function RocketIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    </svg>
  );
}
function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
function GiftIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5" rx="1"/>
      <line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  );
}
function TagIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );
}
function LibIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}
function CogIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
function CrownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/>
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function SignOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
function RocketSmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="flex-shrink-0">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    </svg>
  );
}
