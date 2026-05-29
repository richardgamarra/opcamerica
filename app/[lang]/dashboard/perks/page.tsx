import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const PERKS = [
  {
    brand: "Anthropic Claude",
    logo: "🤖",
    offer: "$50 API credits",
    offerEs: "$50 en creditos de API",
    category: "AI",
    claimed: 12,
    free: true,
  },
  {
    brand: "Notion",
    logo: "📋",
    offer: "6 months Pro free",
    offerEs: "6 meses Pro gratis",
    category: "Productivity",
    claimed: 34,
    free: true,
  },
  {
    brand: "Vercel",
    logo: "▲",
    offer: "$200 hosting credit",
    offerEs: "$200 en hosting",
    category: "Dev Tools",
    claimed: 8,
    free: false,
  },
  {
    brand: "ConvertKit",
    logo: "📧",
    offer: "3 months free",
    offerEs: "3 meses gratis",
    category: "Email",
    claimed: 19,
    free: false,
  },
  {
    brand: "Figma",
    logo: "🎨",
    offer: "1 year Professional",
    offerEs: "1 ano Professional",
    category: "Design",
    claimed: 5,
    free: false,
  },
];

const CAT_COLOR: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700",
  Productivity: "bg-blue-100 text-blue-700",
  "Dev Tools": "bg-gray-100 text-gray-600",
  Email: "bg-green-100 text-green-700",
  Design: "bg-pink-100 text-pink-700",
};

export default async function PerksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

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

      <div className="space-y-3 mb-6">
        {PERKS.map((perk) => (
          <div key={perk.brand} className={`bg-white border rounded-xl p-4 flex items-center gap-4 transition-all ${perk.free ? "border-gray-100 hover:border-gray-200 hover:shadow-sm" : "border-gray-100"}`}>
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl flex-shrink-0">
              {perk.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-semibold text-gray-800 text-sm">{perk.brand}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CAT_COLOR[perk.category] ?? "bg-gray-100 text-gray-600"}`}>
                  {perk.category}
                </span>
                {!perk.free && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                )}
              </div>
              <p className="text-xs text-gray-500">{isEs ? perk.offerEs : perk.offer}</p>
              <p className="text-[10px] text-gray-300 mt-0.5">{perk.claimed} {isEs ? "reclamados" : "claimed"}</p>
            </div>
            <button className={`flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
              perk.free
                ? "bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange"
                : "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100"
            }`}>
              {perk.free ? (isEs ? "Reclamar" : "Claim") : "🔒"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {isEs ? "30+ deals exclusivos con Elite" : "30+ exclusive deals with Elite"}
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            {isEs ? "Mas de $5,000 en valor total para tu stack." : "Over $5,000 in total value for your stack."}
          </p>
        </div>
        <button className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
          {isEs ? "Ver Elite" : "Go Elite"}
        </button>
      </div>
    </div>
  );
}
