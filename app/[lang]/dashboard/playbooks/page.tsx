import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const PLAYBOOKS = [
  {
    icon: "🚀",
    title: "Launch your OPC in 30 days",
    titleEs: "Lanza tu OPC en 30 dias",
    steps: 12,
    time: "30 min",
  },
  {
    icon: "🤖",
    title: "AI content engine for founders",
    titleEs: "Motor de contenido con IA",
    steps: 8,
    time: "20 min",
  },
  {
    icon: "💰",
    title: "Pricing your OPC services",
    titleEs: "Como poner precios a tus servicios",
    steps: 6,
    time: "15 min",
  },
  {
    icon: "📧",
    title: "Cold email that converts",
    titleEs: "Cold email que convierte",
    steps: 10,
    time: "25 min",
  },
  {
    icon: "🌎",
    title: "Expand to the US market",
    titleEs: "Expandete al mercado de EE.UU.",
    steps: 15,
    time: "45 min",
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
          <div key={pb.title} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-2xl flex-shrink-0">{pb.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{isEs ? pb.titleEs : pb.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {pb.steps} {isEs ? "pasos" : "steps"} · {pb.time} {isEs ? "de lectura" : "read"}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" className="flex-shrink-0">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
