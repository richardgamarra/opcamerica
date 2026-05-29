import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const PROGRAMS = [
  {
    name: "Y Combinator",
    type: "Accelerator",
    amount: "$500,000",
    country: "USA",
    deadline: "Oct 2026",
    tags: ["equity", "remote-ok"],
  },
  {
    name: "Startups.mx",
    type: "Grant",
    amount: "$50,000 MXN",
    country: "Mexico",
    deadline: "Jul 2026",
    tags: ["no-equity", "latam"],
  },
  {
    name: "iNNpulsa Colombia",
    type: "Grant",
    amount: "$30,000 USD",
    country: "Colombia",
    deadline: "Aug 2026",
    tags: ["no-equity", "latam"],
  },
  {
    name: "Endeavor ScaleUp",
    type: "Fellowship",
    amount: "Mentorship + Network",
    country: "Americas",
    deadline: "Rolling",
    tags: ["no-equity", "mentorship"],
  },
];

const TYPE_COLOR: Record<string, string> = {
  Accelerator: "bg-purple-100 text-purple-700",
  Grant: "bg-emerald-100 text-emerald-700",
  Fellowship: "bg-blue-100 text-blue-700",
};

export default async function FundingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Fondos y Programas" : "Funding & Programs"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Aceleradoras, grants y fellowships para founders OPC en las Américas."
          : "Accelerators, grants, and fellowships for OPC founders across the Americas."}
      </p>

      {/* Filter row */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["All", "Accelerator", "Grant", "Fellowship"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              f === "All"
                ? "bg-opc-orange text-white border-opc-orange"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Program cards */}
      <div className="space-y-3">
        {PROGRAMS.map((p) => (
          <div
            key={p.name}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TYPE_COLOR[p.type] ?? "bg-gray-100 text-gray-600"}`}>
                    {p.type}
                  </span>
                  <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                    {p.country}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>
                    <span className="font-semibold text-gray-700">{p.amount}</span>
                  </span>
                  <span>
                    {isEs ? "Cierre:" : "Deadline:"}{" "}
                    <span className="font-medium text-gray-600">{p.deadline}</span>
                  </span>
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button className="flex-shrink-0 bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                {isEs ? "Ver más" : "View"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Elite gate */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-5 text-center">
        <span className="text-2xl">👑</span>
        <p className="font-semibold text-amber-800 text-sm mt-2">
          {isEs ? "OPC Elite: acceso completo a 50+ programas" : "OPC Elite: full access to 50+ programs"}
        </p>
        <p className="text-xs text-amber-600 mt-1 mb-3">
          {isEs
            ? "Incluye alertas de nuevos grants, acceso anticipado y aplicaciones asistidas por IA."
            : "Includes new grant alerts, early access, and AI-assisted applications."}
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-5 py-2 rounded-lg transition-colors">
          {isEs ? "Unirse a la lista de espera" : "Join the Waitlist"}
        </button>
      </div>
    </div>
  );
}
