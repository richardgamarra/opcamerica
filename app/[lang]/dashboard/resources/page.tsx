import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSectionSettings } from "@/lib/settings";
import { submitResource } from "../submit/actions";

async function getResources() {
  const result = await pool.query(
    "SELECT * FROM resources WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
}

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const [resources, { canView, canPost }] = await Promise.all([
    getResources(),
    getSectionSettings("resources"),
  ]);

  if (!canView) {
    return (
      <div className="flex items-center justify-center py-24 text-white/40 text-sm">
        {isEs ? "Esta seccion no esta disponible actualmente." : "This section is not available right now."}
      </div>
    );
  }

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-white mb-1">
        {isEs ? "Recursos" : "Resources"}
      </h1>
      <p className="text-sm text-white/40 mb-6">
        {isEs
          ? "Todo lo que necesitas para construir y escalar tu OPC."
          : "Everything you need to build and scale your OPC."}
      </p>

      {/* Submit form */}
      {canPost && (
        <div className="border rounded-xl p-5 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-sm font-semibold text-white mb-4">
            {isEs ? "Compartir un recurso" : "Share a resource"}
          </p>
          <form action={submitResource} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-white/40 mb-1">{isEs ? "Nombre del recurso" : "Resource name"} *</label>
                <input name="title" type="text" required placeholder={isEs ? "Notion OPC Workspace" : "Notion OPC Workspace"}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-white/40 mb-1">{isEs ? "Descripcion corta" : "Short description"}</label>
                <input name="description" type="text" placeholder={isEs ? "Template de Notion para organizar tu OPC" : "Notion template to organize your OPC"}
                  className="w-full rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-white/40 mb-1">URL *</label>
                <input name="url" type="url" required placeholder="https://..."
                  className="w-full rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </div>
            <button type="submit" className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2 rounded-lg transition-colors">
              {isEs ? "Enviar para revision" : "Submit for review"}
            </button>
            <ModerationNotice isEs={isEs} />
          </form>
        </div>
      )}

      {resources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.map((r) => (
            <a key={r.id} href={r.url || "#"} target={r.url ? "_blank" : undefined} rel={r.url ? "noopener noreferrer" : undefined}
              className="border rounded-xl p-4 flex items-start gap-3 hover:border-opc-orange/30 transition-all cursor-pointer"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
              <span className="text-2xl flex-shrink-0">{r.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-semibold text-white">{isEs && r.title_es ? r.title_es : r.title}</p>
                  {r.is_elite && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400">Elite</span>}
                </div>
                <p className="text-xs text-white/40 leading-snug">{isEs && r.description_es ? r.description_es : r.description}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" className="flex-shrink-0 mt-1">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </a>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-xl p-8 text-center text-sm text-white/40" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          {isEs ? "Recursos proximamente. Comparte uno arriba." : "Resources coming soon. Share one above."}
        </div>
      )}
    </div>
  );
}
