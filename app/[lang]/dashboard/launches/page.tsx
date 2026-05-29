import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

export default async function LaunchesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Mis Lanzamientos" : "My Launches"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Presenta tu producto a los founders OPC y consigue tus primeros usuarios."
          : "Present your product to OPC founders and get your first users."}
      </p>

      {/* How it works */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-6">
        <p className="text-sm font-semibold text-gray-800 mb-3">
          {isEs ? "Como funciona" : "How it works"}
        </p>
        <div className="space-y-2">
          {[
            isEs ? "Crea tu perfil de producto (nombre, descripcion, link)" : "Create your product profile (name, description, link)",
            isEs ? "Elige si es un lanzamiento gratuito o con deal exclusivo" : "Choose if it's a free launch or exclusive deal",
            isEs ? "Los founders votan y comentan tu producto" : "Founders vote and comment on your product",
            isEs ? "Apareces en el feed principal de OPCAmerica" : "You appear in the main OPCAmerica feed",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-opc-orange/15 text-opc-orange font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center text-center mb-5">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-500 mb-1">
          {isEs ? "Sin lanzamientos aun" : "No launches yet"}
        </p>
        <p className="text-xs text-gray-300 mb-4">
          {isEs ? "Lanza tu primer producto y llega a la comunidad OPC." : "Launch your first product and reach the OPC community."}
        </p>
        <button className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors">
          {isEs ? "Lanzar mi producto" : "Launch my product"}
        </button>
      </div>

      {/* Plans comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{isEs ? "Plan Gratis" : "Free Plan"}</p>
          <ul className="space-y-1.5 text-xs text-gray-600">
            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {isEs ? "1 lanzamiento activo" : "1 active launch"}</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {isEs ? "Perfil basico de producto" : "Basic product profile"}</li>
            <li className="flex items-center gap-2"><span className="text-gray-300">✗</span> {isEs ? "Deals exclusivos" : "Exclusive deals"}</li>
            <li className="flex items-center gap-2"><span className="text-gray-300">✗</span> {isEs ? "Analíticas" : "Analytics"}</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">OPC Elite</p>
          <ul className="space-y-1.5 text-xs text-gray-600">
            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {isEs ? "3 lanzamientos activos" : "3 active launches"}</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {isEs ? "Deals exclusivos para miembros" : "Exclusive member deals"}</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {isEs ? "Analíticas detalladas" : "Detailed analytics"}</li>
            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {isEs ? "Prioridad en el feed" : "Priority feed placement"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
