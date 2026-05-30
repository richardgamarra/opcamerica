import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";
import { claimPerk } from "./actions";

const CAT_COLOR: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700",
  Productivity: "bg-blue-100 text-blue-700",
  "Dev Tools": "bg-gray-100 text-gray-600",
  Email: "bg-green-100 text-green-700",
  Design: "bg-pink-100 text-pink-700",
  Payments: "bg-yellow-100 text-yellow-700",
  Marketing: "bg-orange-100 text-orange-700",
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

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Perks y Deals" : "Perks & Deals"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Herramientas gratis y descuentos exclusivos para tu stack como founder OPC."
          : "Free tools and exclusive discounts for your OPC founder stack."}
      </p>

      {perks.length > 0 ? (
        <div className="space-y-3">
          {perks.map((perk) => (
            <div key={perk.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                {perk.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-gray-800 text-sm">{perk.brand}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CAT_COLOR[perk.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {perk.category}
                  </span>
                  {perk.is_elite && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{isEs && perk.offer_es ? perk.offer_es : perk.offer}</p>
                <p className="text-[10px] text-gray-300 mt-0.5">{perk.claim_count} {isEs ? "reclamados" : "claimed"}</p>
              </div>
              {perk.already_claimed ? (
                <span className="flex-shrink-0 bg-emerald-50 text-emerald-600 font-semibold text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-emerald-100">
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
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
          {isEs ? "Perks proximamente." : "Perks coming soon."}
        </div>
      )}
    </div>
  );
}
