import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";

async function getPlaybooks() {
  const result = await pool.query(
    "SELECT * FROM playbooks WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
}

export default async function PlaybooksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const playbooks = await getPlaybooks();

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Playbooks</h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Guias paso a paso para founders OPC. Ejecuta, no solo leas."
          : "Step-by-step guides for OPC founders. Execute, don't just read."}
      </p>

      {playbooks.length > 0 ? (
        <div className="space-y-3">
          {playbooks.map((pb) => (
            <div key={pb.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
              <span className="text-2xl flex-shrink-0">{pb.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-gray-800">
                    {isEs && pb.title_es ? pb.title_es : pb.title}
                  </p>
                  {pb.is_elite && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {pb.steps} {isEs ? "pasos" : "steps"}
                  {pb.read_time && <span> · {pb.read_time} {isEs ? "de lectura" : "read"}</span>}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" className="flex-shrink-0">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
          {isEs ? "Playbooks proximamente." : "Playbooks coming soon."}
        </div>
      )}
    </div>
  );
}
