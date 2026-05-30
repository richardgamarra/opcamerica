import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSectionSettings } from "@/lib/settings";
import { submitFunding } from "../submit/actions";

const TYPE_COLOR: Record<string, string> = {
  Accelerator: "bg-purple-400/15 text-purple-400",
  Grant: "bg-emerald-400/15 text-emerald-400",
  Fellowship: "bg-blue-400/15 text-blue-400",
  Incubator: "bg-yellow-400/15 text-yellow-400",
  Loan: "bg-orange-400/15 text-orange-400",
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
      <div className="flex items-center justify-center py-24 text-[var(--t3)] text-sm">
        {isEs ? "Esta seccion no esta disponible actualmente." : "This section is not available right now."}
      </div>
    );
  }

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-[var(--t1)] mb-1">
        {isEs ? "Fondos y Programas" : "Funding & Programs"}
      </h1>
      <p className="text-sm text-[var(--t3)] mb-6">
        {isEs
          ? "Aceleradoras, grants y fellowships para founders OPC en las Americas."
          : "Accelerators, grants, and fellowships for OPC founders across the Americas."}
      </p>

      {/* Submit form */}
      {canPost && (
        <div className="border rounded-xl p-5 mb-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold text-[var(--t1)] mb-4">
            {isEs ? "Compartir un programa" : "Share a program"}
          </p>
          <form action={submitFunding} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Nombre del programa" : "Program name"} *</label>
                <input name="name" type="text" required placeholder="Y Combinator"
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Tipo" : "Type"}</label>
                <select name="type" className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }}>
                  <option value="Accelerator">Accelerator</option>
                  <option value="Grant">Grant</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Incubator">Incubator</option>
                  <option value="Loan">Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Pais" : "Country"} *</label>
                <input name="country" type="text" required placeholder="Mexico"
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Monto" : "Amount"}</label>
                <input name="amount" type="text" placeholder="$50,000"
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Fecha limite" : "Deadline"}</label>
                <input name="deadline" type="text" placeholder={isEs ? "Rolling / Oct 2026" : "Rolling / Oct 2026"}
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">URL</label>
                <input name="url" type="url" placeholder="https://..."
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
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
            <div key={p.id} className="border rounded-xl p-4 hover:border-opc-orange/30 transition-all" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-[var(--t1)] text-sm">{p.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TYPE_COLOR[p.type] ?? "bg-white/10 text-white/55"}`}>{p.type}</span>
                    {p.country && <span className="text-[10px] text-white/40 border px-2 py-0.5 rounded" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>{p.country}</span>}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--t3)]">
                    {p.amount && <span className="font-semibold text-[var(--t2)]">{p.amount}</span>}
                    {p.deadline && <span>{isEs ? "Cierre:" : "Deadline:"} <span className="font-medium text-[var(--t2)]">{p.deadline}</span></span>}
                  </div>
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {p.tags.map((t: string) => (
                        <span key={t} className="text-[10px] text-white/40 border px-2 py-0.5 rounded" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>{t}</span>
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
                  <span className="flex-shrink-0 bg-white/10 text-white/40 font-semibold text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                    {isEs ? "Ver mas" : "View"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-xl p-8 text-center text-sm text-[var(--t3)]" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          {isEs ? "Programas proximamente. Se el primero en compartir uno arriba." : "Programs coming soon. Be the first to share one above."}
        </div>
      )}
    </div>
  );
}
