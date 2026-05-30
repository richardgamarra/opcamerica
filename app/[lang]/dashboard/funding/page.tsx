import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSectionSettings } from "@/lib/settings";
import { submitFunding } from "../submit/actions";

const TYPE_COLOR: Record<string, string> = {
  Accelerator: "bg-purple-100 text-purple-700",
  Grant: "bg-emerald-100 text-emerald-700",
  Fellowship: "bg-blue-100 text-blue-700",
  Incubator: "bg-yellow-100 text-yellow-700",
  Loan: "bg-orange-100 text-orange-700",
};

async function getFundingPrograms() {
  const result = await pool.query(
    "SELECT * FROM funding_programs WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
}

export default async function FundingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const [programs, { canView, canPost }] = await Promise.all([
    getFundingPrograms(),
    getSectionSettings("funding"),
  ]);

  if (!canView) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
        {isEs ? "Esta seccion no esta disponible actualmente." : "This section is not available right now."}
      </div>
    );
  }

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Fondos y Programas" : "Funding & Programs"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Aceleradoras, grants y fellowships para founders OPC en las Americas."
          : "Accelerators, grants, and fellowships for OPC founders across the Americas."}
      </p>

      {/* Submit form */}
      {canPost && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            {isEs ? "Compartir un programa" : "Share a program"}
          </p>
          <form action={submitFunding} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Nombre del programa" : "Program name"} *</label>
                <input name="name" type="text" required placeholder="Y Combinator"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Tipo" : "Type"}</label>
                <select name="type" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-opc-orange transition-colors">
                  <option value="Accelerator">Accelerator</option>
                  <option value="Grant">Grant</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Incubator">Incubator</option>
                  <option value="Loan">Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Pais" : "Country"} *</label>
                <input name="country" type="text" required placeholder="Mexico"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Monto" : "Amount"}</label>
                <input name="amount" type="text" placeholder="$50,000"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Fecha limite" : "Deadline"}</label>
                <input name="deadline" type="text" placeholder={isEs ? "Rolling / Oct 2026" : "Rolling / Oct 2026"}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">URL</label>
                <input name="url" type="url" placeholder="https://..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
            </div>
            <button type="submit" className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2 rounded-lg transition-colors">
              {isEs ? "Enviar para revision" : "Submit for review"}
            </button>
            <ModerationNotice isEs={isEs} />
          </form>
        </div>
      )}

      {programs.length > 0 ? (
        <div className="space-y-3">
          {programs.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TYPE_COLOR[p.type] ?? "bg-gray-100 text-gray-600"}`}>{p.type}</span>
                    {p.country && <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">{p.country}</span>}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {p.amount && <span className="font-semibold text-gray-700">{p.amount}</span>}
                    {p.deadline && <span>{isEs ? "Cierre:" : "Deadline:"} <span className="font-medium text-gray-600">{p.deadline}</span></span>}
                  </div>
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {p.tags.map((t: string) => (
                        <span key={t} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                    {isEs ? "Ver mas" : "View"}
                  </a>
                ) : (
                  <span className="flex-shrink-0 bg-gray-100 text-gray-400 font-semibold text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                    {isEs ? "Ver mas" : "View"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
          {isEs ? "Programas proximamente. Se el primero en compartir uno arriba." : "Programs coming soon. Be the first to share one above."}
        </div>
      )}
    </div>
  );
}
