import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";
import { claimPerk } from "./actions";

const CAT_COLOR: Record<string, string> = {
  AI: "bg-purple-400/15 text-purple-400",
  Productivity: "bg-blue-400/15 text-blue-400",
  "Dev Tools": "bg-white/10 text-white/55",
  Email: "bg-green-400/15 text-green-400",
  Design: "bg-pink-400/15 text-pink-400",
  Payments: "bg-yellow-400/15 text-yellow-400",
  Marketing: "bg-orange-400/15 text-orange-400",
};

async function getPerksWithClaims(userId: string) {
  const result = await pool.query(
    `SELECT p.*,
       COUNT(c.id) as claim_count,
       EXISTS(SELECT 1 FROM claims c2 WHERE c2.perk_id = p.id AND c2.user_id = $1) as already_claimed
     FROM perks p
     LEFT JOIN claims c ON c.perk_id = p.id
     WHERE p.is_active = true
     GROUP BY p.id
     ORDER BY p.created_at DESC`,
    [userId]
  );
  return result.rows;
}

export default async function PerksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const session = await getSession();
  const perks = session ? await getPerksWithClaims(session.id) : [];

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-white mb-1">
        {isEs ? "Perks y Deals" : "Perks & Deals"}
      </h1>
      <p className="text-sm text-white/40 mb-6">
        {isEs
          ? "Herramientas gratis y descuentos exclusivos para tu stack como founder OPC."
          : "Free tools and exclusive discounts for your OPC founder stack."}
      </p>

      {perks.length > 0 ? (
        <div className="space-y-3">
          {perks.map((perk) => (
            <div key={perk.id} className="border rounded-xl p-4 flex items-center gap-4 hover:border-opc-orange/30 transition-all" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                {perk.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-white text-sm">{perk.brand}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CAT_COLOR[perk.category] ?? "bg-white/10 text-white/55"}`}>
                    {perk.category}
                  </span>
                  {perk.is_elite && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400">Elite</span>
                  )}
                </div>
                <p className="text-xs text-white/40">{isEs && perk.offer_es ? perk.offer_es : perk.offer}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{perk.claim_count} {isEs ? "reclamados" : "claimed"}</p>
              </div>
              {perk.already_claimed ? (
                <span className="flex-shrink-0 bg-emerald-400/10 text-emerald-400 font-semibold text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-emerald-400/20">
                  {isEs ? "Reclamado" : "Claimed"}
                </span>
              ) : (
                <form action={claimPerk.bind(null, perk.id)}>
                  <button type="submit" className="flex-shrink-0 bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                    {isEs ? "Reclamar" : "Claim"}
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-xl p-8 text-center text-sm text-white/40" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          {isEs ? "Perks proximamente." : "Perks coming soon."}
        </div>
      )}
    </div>
  );
}
