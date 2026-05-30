import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import Link from "next/link";

export default async function OverviewPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  const today = new Date().toLocaleDateString(isEs ? "es-MX" : "en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const quickActions = [
    { icon: "📡", title: isEs ? "Al día hoy" : "Catch up on today", sub: isEs ? "Lo que los builders de IA publicaron" : "What AI builders shipped and said", href: `/${lang}/dashboard/daily-pulse` },
    { icon: "💼", title: isEs ? "Buscar fondos" : "Find funding", sub: isEs ? "Aceleradoras, grants y fellowships" : "Accelerators, grants, and fellowships for solo founders", href: `/${lang}/dashboard/funding` },
    { icon: "🚀", title: isEs ? "Lanzar tu producto" : "Launch your product", sub: isEs ? "Llega a founders OPC y primeros usuarios" : "Reach OPC founders + early users with a giveaway", href: `/${lang}/dashboard/launches` },
    { icon: "📅", title: isEs ? "Unirse a un evento" : "Join an event", sub: isEs ? "Conecta con founders en tiempo real" : "Connect with founders in real-time", href: `/${lang}/dashboard/events` },
    { icon: "🎁", title: isEs ? "Reclamar un deal" : "Claim a deal", sub: isEs ? "Herramientas y descuentos gratis" : "Free tools & discounts for your stack", href: `/${lang}/dashboard/perks` },
  ];

  return (
    <div>
      <EliteBanner lang={lang} />

      <p className="text-xs text-white/30 mb-1 capitalize">{today}</p>
      <h1 className="text-2xl font-bold text-white mb-1">
        {isEs ? "Hola, Rick Gama 👋" : "Hey Rick Gama 👋"}
      </h1>
      <p className="text-sm text-white/40 mb-8">
        {isEs ? "Haz tu primer check-in y mantente accountable." : "Make your first check-in and keep yourself accountable."}
      </p>

      {/* Weekly check-in + history */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Check-in card */}
        <div className="rounded-xl border p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <h2 className="font-semibold text-white text-sm">
              {isEs ? "Check-in Semanal" : "Weekly Check-in"}
            </h2>
          </div>
          <p className="text-xs text-white/35 mb-3">
            {isEs ? "¿Qué enviaste o trabajaste esta semana? Mantente accountable." : "What did you ship or work on this week? Keep yourself accountable."}
          </p>
          <textarea
            rows={4}
            placeholder={isEs ? "Ej: Lancé la v2 de mi landing, conseguí 3 nuevos usuarios..." : "e.g., Launched v2 of my landing page, got 3 new signups..."}
            className="w-full rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 resize-none focus:outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
          <button className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">
            {isEs ? "Publicar Update" : "Post Update"}
          </button>
          <p className="text-xs text-white/20 mt-2.5 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {isEs ? "0 founders hicieron check-in esta semana" : "0 founders checked in this week"}
          </p>
        </div>

        {/* History card */}
        <div className="rounded-xl border p-5 flex flex-col" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="font-semibold text-white text-sm mb-3">
            {isEs ? "Tu Historial de Check-ins" : "Your Check-in History"}
          </h2>
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" className="mb-3">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p className="text-xs text-white/25">
              {isEs ? "Sin check-ins aún. Haz el primero a la izquierda." : "No check-ins yet. Make your first one on the left."}
            </p>
          </div>
        </div>
      </div>

      {/* My Events */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <span>📅</span> {isEs ? "Mis Eventos" : "My Events"}
          </h2>
          <Link href={`/${lang}/dashboard/events`} className="text-xs text-opc-orange font-medium hover:underline">
            {isEs ? "Ver eventos →" : "Browse events →"}
          </Link>
        </div>
        <div className="rounded-xl border border-dashed p-5 flex items-center gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-white/40">{isEs ? "Sin eventos guardados" : "No saved events yet"}</p>
            <p className="text-xs text-white/25">{isEs ? "Guarda cualquier evento en la pestaña Eventos." : "Tap the bookmark on any event in the Events tab to see it here."}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="font-semibold text-white mb-3">
        {isEs ? "¿Qué quieres hacer?" : "What would you like to do?"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}
            className="rounded-xl border p-4 flex items-start gap-3 transition-all group hover:border-opc-orange/30"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
            <span className="text-xl flex-shrink-0 mt-0.5">{action.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white group-hover:text-opc-orange transition-colors">{action.title}</p>
              <p className="text-xs text-white/35 mt-0.5 leading-snug">{action.sub}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" className="flex-shrink-0 mt-1">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* Elite upsell */}
      <div className="rounded-xl border p-4 flex items-center justify-between gap-4" style={{ backgroundColor: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}>
        <div className="flex items-center gap-3">
          <span className="text-lg">👑</span>
          <div>
            <p className="text-sm font-semibold text-amber-400">
              {isEs ? "Saca más partido de OPC" : "Get more out of OPC"}
            </p>
            <p className="text-xs text-amber-400/60">
              {isEs ? "3 slots de producto, eventos exclusivos y partner perks." : "3x product slots, exclusive events, and partner perks."}
            </p>
          </div>
        </div>
        <Link href={`/${lang}/join-elite`}
          className="text-sm font-semibold text-amber-400 border border-amber-400/40 px-4 py-1.5 rounded-lg hover:bg-amber-400/10 transition-colors whitespace-nowrap">
          {isEs ? "Más info" : "Learn more"}
        </Link>
      </div>
    </div>
  );
}
