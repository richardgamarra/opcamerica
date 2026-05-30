import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getSectionSettings } from "@/lib/settings";
import { submitLaunch } from "./actions";

async function getUserLaunches(userId: string) {
  const result = await pool.query(
    "SELECT * FROM launches WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-400/15 text-yellow-400",
  approved: "bg-emerald-400/15 text-emerald-400",
  rejected: "bg-red-400/15 text-red-400",
};

export default async function LaunchesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const session = await getSession();
  const [launches, { canView, canPost }] = await Promise.all([
    session ? getUserLaunches(session.id) : Promise.resolve([]),
    getSectionSettings("launches"),
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
        {isEs ? "Mis Lanzamientos" : "My Launches"}
      </h1>
      <p className="text-sm text-[var(--t3)] mb-6">
        {isEs
          ? "Presenta tu producto a los founders OPC y consigue tus primeros usuarios."
          : "Present your product to OPC founders and get your first users."}
      </p>

      {/* Submit form */}
      {canPost && <div className="border rounded-xl p-5 mb-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <p className="text-sm font-semibold text-[var(--t1)] mb-4">
          {isEs ? "Lanzar un producto" : "Launch a product"}
        </p>
        <form action={submitLaunch} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Nombre del producto" : "Product name"} *</label>
              <input name="name" type="text" required placeholder="My OPC Tool"
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
          <div>
            <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Tagline (una linea)" : "Tagline (one line)"} *</label>
            <input name="tagline" type="text" required placeholder={isEs ? "La herramienta mas simple para founders OPC" : "The simplest tool for OPC founders"}
              className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
              style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
          </div>
          <button type="submit" className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
            {isEs ? "Enviar para revision" : "Submit for review"}
          </button>
          <ModerationNotice isEs={isEs} />
        </form>
      </div>}

      {/* My launches */}
      {launches.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[var(--t3)] uppercase tracking-widest">
            {isEs ? "Mis envios" : "My submissions"}
          </p>
          {launches.map((l) => (
            <div key={l.id} className="border rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-[var(--t1)] text-sm">{l.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_COLORS[l.status] ?? "bg-white/10 text-white/55"}`}>
                    {l.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--t3)]">{l.tagline}</p>
                {l.url && (
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-opc-orange hover:underline mt-0.5 block">
                    {l.url}
                  </a>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-[var(--t2)]">{l.votes}</p>
                <p className="text-[10px] text-[var(--t3)]">{isEs ? "votos" : "votes"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {launches.length === 0 && (
        <div className="border border-dashed rounded-xl p-8 flex flex-col items-center text-center" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold text-[var(--t3)] mb-1">
            {isEs ? "Sin lanzamientos aun" : "No launches yet"}
          </p>
          <p className="text-xs text-[var(--t4)]">
            {isEs ? "Completa el formulario de arriba para lanzar tu producto." : "Complete the form above to launch your product."}
          </p>
        </div>
      )}
    </div>
  );
}
