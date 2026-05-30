import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";

async function getResources() {
  const result = await pool.query(
    "SELECT * FROM resources WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
}

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const resources = await getResources();

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Recursos" : "Resources"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Todo lo que necesitas para construir y escalar tu OPC."
          : "Everything you need to build and scale your OPC."}
      </p>

      {resources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.map((r) => (
            <a
              key={r.id}
              href={r.url || "#"}
              target={r.url ? "_blank" : undefined}
              rel={r.url ? "noopener noreferrer" : undefined}
              className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <span className="text-2xl flex-shrink-0">{r.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {isEs && r.title_es ? r.title_es : r.title}
                  </p>
                  {r.is_elite && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 leading-snug">
                  {isEs && r.description_es ? r.description_es : r.description}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" className="flex-shrink-0 mt-1">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
          {isEs ? "Recursos proximamente." : "Resources coming soon."}
        </div>
      )}
    </div>
  );
}
