import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const PLAYBOOKS = [
  {
    icon: "🚀",
    title: "Launch your OPC in 30 days",
    titleEs: "Lanza tu OPC en 30 dias",
    steps: 12,
    time: "30 min",
    free: true,
  },
  {
    icon: "🤖",
    title: "AI content engine for founders",
    titleEs: "Motor de contenido con IA",
    steps: 8,
    time: "20 min",
    free: true,
  },
  {
    icon: "💰",
    title: "Pricing your OPC services",
    titleEs: "Como poner precios a tus servicios",
    steps: 6,
    time: "15 min",
    free: true,
  },
  {
    icon: "📧",
    title: "Cold email that converts",
    titleEs: "Cold email que convierte",
    steps: 10,
    time: "25 min",
    free: false,
  },
  {
    icon: "🌎",
    title: "Expand to the US market",
    titleEs: "Expandete al mercado de EE.UU.",
    steps: 15,
    time: "45 min",
    free: false,
  },
];

export default async function PlaybooksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Playbooks" : "Playbooks"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Guias paso a paso para founders OPC. Ejecuta, no solo leas."
          : "Step-by-step guides for OPC founders. Execute, don't just read."}
      </p>

      <div className="space-y-3">
        {PLAYBOOKS.map((pb) => (
          <div key={pb.title} className={`bg-white border rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-all ${pb.free ? "border-gray-100 hover:border-gray-200" : "border-gray-100 opacity-75"}`}>
            <span className="text-2xl flex-shrink-0">{pb.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-800">{isEs ? pb.titleEs : pb.title}</p>
                {!pb.free && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {pb.steps} {isEs ? "pasos" : "steps"} · {pb.time} {isEs ? "de lectura" : "read"}
              </p>
            </div>
            <button className={`flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg transition-colors ${
              pb.free
                ? "bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange"
                : "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100"
            }`}>
              {pb.free ? (isEs ? "Abrir" : "Open") : "🔒"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {isEs ? "Desbloquea todos los playbooks con Elite" : "Unlock all playbooks with Elite"}
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            {isEs ? "Mas de 20 guias exclusivas para founders OPC." : "20+ exclusive guides for OPC founders."}
          </p>
        </div>
        <button className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
          {isEs ? "Ver Elite" : "Go Elite"}
        </button>
      </div>
    </div>
  );
}
