import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";
import Link from "next/link";

const RESOURCES = [
  {
    icon: "📚",
    title: "OPC Founder Library",
    titleEs: "Biblioteca del Founder OPC",
    desc: "Curated books, articles, and frameworks for one-person companies.",
    descEs: "Libros, articulos y frameworks para One Person Companies.",
    href: "#",
    free: true,
  },
  {
    icon: "🎙",
    title: "Podcast Archive",
    titleEs: "Archivo de Podcasts",
    desc: "Every Daily Pulse episode, searchable and organized by topic.",
    descEs: "Todos los episodios de Daily Pulse, buscables por tema.",
    href: "#",
    free: true,
  },
  {
    icon: "🧰",
    title: "AI Tools Directory",
    titleEs: "Directorio de Herramientas IA",
    desc: "55+ AI tools curated for OPC founders, with member deals.",
    descEs: "55+ herramientas IA para founders OPC, con deals exclusivos.",
    href: `#`,
    free: true,
  },
  {
    icon: "📊",
    title: "OPC Templates Pack",
    titleEs: "Pack de Plantillas OPC",
    desc: "Notion, Figma, and spreadsheet templates to run your OPC.",
    descEs: "Plantillas de Notion, Figma y hojas de calculo para tu OPC.",
    href: "#",
    free: false,
  },
  {
    icon: "🎓",
    title: "OPC Courses",
    titleEs: "Cursos OPC",
    desc: "Deep-dive courses on pricing, launch, AI automation, and growth.",
    descEs: "Cursos sobre precios, lanzamiento, automatizacion con IA y crecimiento.",
    href: "#",
    free: false,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {RESOURCES.map((r) => (
          <div key={r.title} className={`bg-white border rounded-xl p-4 flex items-start gap-3 transition-all ${r.free ? "border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer" : "border-gray-100 opacity-75"}`}>
            <span className="text-2xl flex-shrink-0">{r.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="text-sm font-semibold text-gray-800">{isEs ? r.titleEs : r.title}</p>
                {!r.free && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                )}
              </div>
              <p className="text-xs text-gray-400 leading-snug">{isEs ? r.descEs : r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {isEs ? "Elite: acceso a todos los recursos" : "Elite: access to all resources"}
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            {isEs ? "Templates, cursos y mas incluidos en $99/ano." : "Templates, courses, and more included at $99/year."}
          </p>
        </div>
        <Link
          href={`/${lang}/join-elite`}
          className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          {isEs ? "Ver Elite" : "Go Elite"}
        </Link>
      </div>
    </div>
  );
}
