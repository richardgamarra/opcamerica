import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const RESOURCES = [
  {
    icon: "📚",
    title: "OPC Founder Library",
    titleEs: "Biblioteca del Founder OPC",
    desc: "Curated books, articles, and frameworks for one-person companies.",
    descEs: "Libros, articulos y frameworks para One Person Companies.",
  },
  {
    icon: "🎙",
    title: "Podcast Archive",
    titleEs: "Archivo de Podcasts",
    desc: "Every Daily Pulse episode, searchable and organized by topic.",
    descEs: "Todos los episodios de Daily Pulse, buscables por tema.",
  },
  {
    icon: "🧰",
    title: "AI Tools Directory",
    titleEs: "Directorio de Herramientas IA",
    desc: "55+ AI tools curated for OPC founders, with member deals.",
    descEs: "55+ herramientas IA para founders OPC, con deals exclusivos.",
  },
  {
    icon: "📊",
    title: "OPC Templates Pack",
    titleEs: "Pack de Plantillas OPC",
    desc: "Notion, Figma, and spreadsheet templates to run your OPC.",
    descEs: "Plantillas de Notion, Figma y hojas de calculo para tu OPC.",
  },
  {
    icon: "🎓",
    title: "OPC Courses",
    titleEs: "Cursos OPC",
    desc: "Deep-dive courses on pricing, launch, AI automation, and growth.",
    descEs: "Cursos sobre precios, lanzamiento, automatizacion con IA y crecimiento.",
  },
];

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Recursos" : "Resources"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Todo lo que necesitas para construir y escalar tu OPC."
          : "Everything you need to build and scale your OPC."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RESOURCES.map((r) => (
          <div key={r.title} className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
            <span className="text-2xl flex-shrink-0">{r.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 mb-1">{isEs ? r.titleEs : r.title}</p>
              <p className="text-xs text-gray-400 leading-snug">{isEs ? r.descEs : r.desc}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" className="flex-shrink-0 mt-1">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
