import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";

async function getUserClaims(userId: string) {
  const result = await pool.query(
    `SELECT c.*, p.brand, p.logo, p.offer, p.offer_es, p.category, p.claim_url
     FROM claims c
     JOIN perks p ON c.perk_id = p.id
     WHERE c.user_id = $1
     ORDER BY c.claimed_at DESC`,
    [userId]
  );
  return result.rows;
}

const CAT_COLOR: Record<string, string> = {
  AI: "bg-purple-400/15 text-purple-400",
  Productivity: "bg-blue-400/15 text-blue-400",
  "Dev Tools": "bg-white/10 text-white/55",
  Email: "bg-green-400/15 text-green-400",
  Design: "bg-pink-400/15 text-pink-400",
  Payments: "bg-yellow-400/15 text-yellow-400",
  Marketing: "bg-orange-400/15 text-orange-400",
};

export default async function ClaimsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const session = await getSession();
  const claims = session ? await getUserClaims(session.id) : [];

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-white mb-1">
        {isEs ? "Mis Claims" : "My Claims"}
      </h1>
      <p className="text-sm text-white/40 mb-6">
        {isEs
          ? "Todos los deals y perks que has reclamado en un solo lugar."
          : "All the deals and perks you have claimed in one place."}
      </p>

      {claims.length > 0 ? (
        <div className="space-y-3">
          {claims.map((c) => (
            <div key={c.id} className="border rounded-xl p-4 flex items-center gap-4 hover:border-opc-orange/30 transition-all" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                {c.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-white text-sm">{c.brand}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CAT_COLOR[c.category] ?? "bg-white/10 text-white/55"}`}>
                    {c.category}
                  </span>
                </div>
                <p className="text-xs text-white/40">{isEs && c.offer_es ? c.offer_es : c.offer}</p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  {isEs ? "Reclamado" : "Claimed"} {new Date(c.claimed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              {c.claim_url ? (
                <a
                  href={c.claim_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  {isEs ? "Acceder" : "Access"}
                </a>
              ) : (
                <span className="flex-shrink-0 bg-emerald-400/10 text-emerald-400 font-semibold text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-emerald-400/20">
                  {isEs ? "Activo" : "Active"}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-xl p-10 flex flex-col items-center text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              <path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-white/40 mb-1">
            {isEs ? "Sin claims aun" : "No claims yet"}
          </p>
          <p className="text-xs text-white/25 mb-4">
            {isEs
              ? "Ve a Perks y Deals para reclamar tu primer beneficio."
              : "Head to Perks and Deals to claim your first benefit."}
          </p>
          <a
            href={`/${lang}/dashboard/perks`}
            className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            {isEs ? "Ver Perks" : "Browse Perks"}
          </a>
        </div>
      )}
    </div>
  );
}
