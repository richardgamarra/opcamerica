import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const PULSE_DATA = {
  date: "Friday, May 29",
  podcast: { show: "AI & I by Every", title: "We Automated Everything With AI and Tripled Our Output", url: "#" },
  blog: { source: "Anthropic Engineering", title: "An update on recent Claude Code quality reports", url: "#" },
  builders: [],
};

export default async function DailyPulsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Pulso Diario" : "Daily Pulse"}
      </h1>
      <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {isEs
          ? "Lo que los builders de IA están diciendo, curado de X, podcasts y blogs de ingeniería. Actualizado cada mañana a las 8 AM."
          : "What AI builders are saying, curated from X, podcasts, and engineering blogs, updated every morning at 8 AM."}
      </p>

      {/* Date nav */}
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-3 mb-4">
        <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          {isEs ? "Anterior" : "Older"}
        </button>
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-opc-orange">📡</span> {PULSE_DATA.date}
        </span>
        <button className="text-sm text-gray-300 flex items-center gap-1 cursor-not-allowed">
          {isEs ? "Siguiente" : "Newer"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Today's recap */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 bg-opc-orange/15 rounded-full flex items-center justify-center text-base">⚡</span>
          <h2 className="font-semibold text-gray-800">{isEs ? "Resumen de Hoy" : "Today's Recap"}</h2>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          {isEs ? "Podcast destacado:" : "Today's featured podcast:"}{" "}
          <span className="font-semibold text-opc-orange">{PULSE_DATA.podcast.show}</span>
          {" "}&ldquo;<em>{PULSE_DATA.podcast.title}</em>&rdquo;
        </p>
        <p className="text-sm text-gray-600">
          {isEs ? "Vale la pena leer:" : "Worth reading:"}{" "}
          &ldquo;<em>{PULSE_DATA.blog.title}</em>&rdquo;{" "}
          {isEs ? "por" : "by"} <span className="font-semibold">{PULSE_DATA.blog.source}</span>
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { count: PULSE_DATA.builders.length, label: isEs ? "builders" : "builders", icon: "👥" },
          { count: 1, label: isEs ? "podcast" : "podcast", icon: "🎙" },
          { count: 1, label: isEs ? "blog" : "blog", icon: "📄" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-2.5">
            <span className="text-sm">{stat.icon}</span>
            <span className="text-sm text-gray-600">
              <span className="font-bold text-gray-800">{stat.count}</span> {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Podcast */}
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
        {isEs ? "PODCAST DE HOY" : "TODAY'S PODCAST"}
      </p>
      <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 mb-5 hover:border-gray-200 transition-colors cursor-pointer">
        <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wide mb-1">{PULSE_DATA.podcast.show}</p>
          <p className="text-sm font-semibold text-gray-800">{PULSE_DATA.podcast.title}</p>
        </div>
      </div>

      {/* Blog */}
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
        {isEs ? "VALE LA PENA LEER" : "WORTH READING"}
      </p>
      <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 mb-6 hover:border-gray-200 transition-colors cursor-pointer">
        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wide mb-1">{PULSE_DATA.blog.source}</p>
          <p className="text-sm font-semibold text-gray-800">{PULSE_DATA.blog.title}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
        <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          {isEs ? "Ver archivo completo en la página de Insights →" : "Explore full archive on the Insights page →"}
        </button>
      </div>
    </div>
  );
}
