import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSectionSettings } from "@/lib/settings";
import { submitPlaybook } from "../submit/actions";

async function getPlaybooks() {
  const result = await pool.query(
    "SELECT * FROM playbooks WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
}

export default async function PlaybooksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const [playbooks, { canView, canPost }] = await Promise.all([
    getPlaybooks(),
    getSectionSettings("playbooks"),
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

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Playbooks</h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Guias paso a paso para founders OPC. Ejecuta, no solo leas."
          : "Step-by-step guides for OPC founders. Execute, don't just read."}
      </p>

      {/* Submit form */}
      {canPost && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            {isEs ? "Proponer un playbook" : "Suggest a playbook"}
          </p>
          <form action={submitPlaybook} encType="multipart/form-data" className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Titulo" : "Title"} *</label>
                <input name="title" type="text" required placeholder={isEs ? "Como conseguir tus primeros 10 clientes" : "How to get your first 10 clients"}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Tiempo estimado" : "Estimated read time"}</label>
                <input name="read_time" type="text" placeholder="20 min"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  {isEs ? "PDF (opcional)" : "PDF file (optional)"}
                </label>
                <input name="pdf" type="file" accept=".pdf"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-opc-orange/10 file:text-opc-orange hover:file:bg-opc-orange/20 transition-colors" />
                <p className="text-[11px] text-gray-400 mt-1">
                  {isEs
                    ? "Si tienes el playbook en PDF, adjuntalo aqui para que el admin lo revise."
                    : "If you have the playbook as a PDF, attach it here for admin review."}
                </p>
              </div>
            </div>
            <button type="submit" className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2 rounded-lg transition-colors">
              {isEs ? "Enviar para revision" : "Submit for review"}
            </button>
            <ModerationNotice isEs={isEs} />
          </form>
        </div>
      )}

      {playbooks.length > 0 ? (
        <div className="space-y-3">
          {playbooks.map((pb) => (
            <div key={pb.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-gray-200 hover:shadow-sm transition-all">
              <span className="text-2xl flex-shrink-0">{pb.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-gray-800">{isEs && pb.title_es ? pb.title_es : pb.title}</p>
                  {pb.is_elite && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {pb.steps > 0 && <span>{pb.steps} {isEs ? "pasos" : "steps"}</span>}
                  {pb.read_time && <span>{pb.steps > 0 ? " · " : ""}{pb.read_time} {isEs ? "de lectura" : "read"}</span>}
                </p>
              </div>
              {pb.pdf_url ? (
                <a
                  href={pb.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-opc-orange hover:text-opc-orange/80 bg-opc-orange/8 hover:bg-opc-orange/15 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  PDF
                </a>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" className="flex-shrink-0">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
          {isEs ? "Playbooks proximamente. Sugiere uno arriba." : "Playbooks coming soon. Suggest one above."}
        </div>
      )}
    </div>
  );
}
