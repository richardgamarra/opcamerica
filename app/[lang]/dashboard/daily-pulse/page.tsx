import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";

const TYPE_ICON: Record<string, string> = {
  podcast: "🎙",
  ai: "🤖",
  webpage: "📄",
  youtube: "▶️",
};

const TYPE_COLOR_ICON: Record<string, string> = {
  podcast: "bg-purple-400/15",
  ai: "bg-blue-400/15",
  webpage: "bg-white/10",
  youtube: "bg-red-400/15",
};

const TYPE_STROKE: Record<string, string> = {
  podcast: "#c084fc",
  ai: "#60a5fa",
  webpage: "var(--t2)",
  youtube: "#f87171",
};

const TYPE_LABEL_COLOR: Record<string, string> = {
  podcast: "text-purple-400",
  ai: "text-blue-400",
  webpage: "text-white/40",
  youtube: "text-red-400",
};

async function getPulseByDate() {
  const result = await pool.query(
    "SELECT * FROM daily_pulse WHERE is_active = true ORDER BY pulse_date DESC, sort_order ASC, created_at ASC"
  );
  const items = result.rows;

  const byDate: Record<string, typeof items> = {};
  for (const item of items) {
    const d = item.pulse_date.toISOString().split("T")[0];
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(item);
  }
  return byDate;
}

function formatDate(dateStr: string, isEs: boolean) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString(isEs ? "es-MX" : "en-US", { weekday: "long", month: "long", day: "numeric" });
}

function TypeIcon({ type }: { type: string }) {
  if (type === "podcast") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TYPE_STROKE[type]} strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    );
  }
  if (type === "youtube") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TYPE_STROKE[type]} strokeWidth="2">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TYPE_STROKE[type] ?? "var(--t2)"} strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

export default async function DailyPulsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const byDate = await getPulseByDate();
  const dates = Object.keys(byDate);
  const latestDate = dates[0];
  const latestItems = latestDate ? byDate[latestDate] : [];

  const podcast = latestItems.find((i) => i.type === "podcast");
  const blog = latestItems.find((i) => i.type === "webpage" || i.type === "ai");

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-[var(--t1)] mb-1">
        {isEs ? "Pulso Diario" : "Daily Pulse"}
      </h1>
      <p className="text-sm text-[var(--t3)] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {isEs
          ? "Lo que los builders de IA estan diciendo, curado de X, podcasts y blogs de ingenieria."
          : "What AI builders are saying, curated from podcasts, blogs, and YouTube."}
      </p>

      {dates.length === 0 ? (
        <div className="border border-dashed rounded-xl p-12 text-center text-sm text-[var(--t3)]" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          {isEs ? "Contenido proximamente. Vuelve pronto." : "Content coming soon. Check back shortly."}
        </div>
      ) : (
        <>
          {/* Date nav */}
          <div className="flex items-center justify-between border rounded-xl px-5 py-3 mb-4" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <span className="text-sm text-[var(--t4)] flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              {isEs ? "Anterior" : "Older"}
            </span>
            <span className="text-sm font-semibold text-[var(--t2)] flex items-center gap-2">
              <span className="text-opc-orange">📡</span>
              {latestDate ? formatDate(latestDate, isEs) : ""}
            </span>
            <span className="text-sm text-[var(--t4)] flex items-center gap-1">
              {isEs ? "Siguiente" : "Newer"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </div>

          {/* Today's recap */}
          {(podcast || blog) && (
            <div className="border rounded-xl p-5 mb-5" style={{ backgroundColor: "rgba(232,82,42,0.06)", borderColor: "rgba(232,82,42,0.15)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 bg-opc-orange/15 rounded-full flex items-center justify-center text-base">⚡</span>
                <h2 className="font-semibold text-[var(--t1)]">{isEs ? "Resumen de Hoy" : "Today's Recap"}</h2>
              </div>
              {podcast && (
                <p className="text-sm text-[var(--t2)] mb-1">
                  {isEs ? "Podcast destacado:" : "Featured podcast:"}{" "}
                  <span className="font-semibold text-opc-orange">{podcast.source}</span>
                  {podcast.source && " "}&ldquo;<em>{podcast.title}</em>&rdquo;
                </p>
              )}
              {blog && (
                <p className="text-sm text-[var(--t2)]">
                  {isEs ? "Vale la pena leer:" : "Worth reading:"}{" "}
                  &ldquo;<em>{blog.title}</em>&rdquo;
                  {blog.source && <span> {isEs ? "de" : "by"} <span className="font-semibold">{blog.source}</span></span>}
                </p>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {(["podcast", "ai", "webpage", "youtube"] as const).map((type) => {
              const count = latestItems.filter((i) => i.type === type).length;
              return (
                <div key={type} className="border rounded-xl px-3 py-3 flex items-center gap-2" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                  <span className="text-sm">{TYPE_ICON[type]}</span>
                  <span className="text-sm text-[var(--t2)]">
                    <span className="font-bold text-[var(--t1)]">{count}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Items grouped by type */}
          {(["podcast", "youtube", "ai", "webpage"] as const).map((type) => {
            const typeItems = latestItems.filter((i) => i.type === type);
            if (typeItems.length === 0) return null;

            const TYPE_SECTION_LABEL: Record<string, { en: string; es: string }> = {
              podcast: { en: "TODAY'S PODCASTS", es: "PODCASTS DE HOY" },
              youtube: { en: "VIDEOS", es: "VIDEOS" },
              ai: { en: "AI & TECH", es: "IA Y TECNOLOGIA" },
              webpage: { en: "WORTH READING", es: "VALE LA PENA LEER" },
            };

            return (
              <div key={type} className="mb-5">
                <p className="text-[11px] font-bold text-[var(--t3)] uppercase tracking-widest mb-2">
                  {isEs ? TYPE_SECTION_LABEL[type].es : TYPE_SECTION_LABEL[type].en}
                </p>
                <div className="space-y-2">
                  {typeItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.url || "#"}
                      target={item.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="border rounded-xl p-4 flex items-start gap-3 hover:border-opc-orange/30 transition-all block"
                      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
                    >
                      <div className={`w-9 h-9 ${TYPE_COLOR_ICON[type]} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon type={type} />
                      </div>
                      <div className="min-w-0 flex-1">
                        {item.source && (
                          <p className={`text-[11px] font-bold uppercase tracking-wide mb-1 ${TYPE_LABEL_COLOR[type]}`}>{item.source}</p>
                        )}
                        <p className="text-sm font-semibold text-[var(--t1)]">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-[var(--t3)] mt-0.5">{item.description}</p>
                        )}
                      </div>
                      {item.url && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--t5)" strokeWidth="2" className="flex-shrink-0 mt-1">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
