import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

export default async function ClaimsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Mis Claims" : "My Claims"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Todos los deals y perks que has reclamado en un solo lugar."
          : "All the deals and perks you have claimed in one place."}
      </p>

      <div className="bg-white border border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
            <path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-500 mb-1">
          {isEs ? "Sin claims aun" : "No claims yet"}
        </p>
        <p className="text-xs text-gray-300 mb-4">
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
    </div>
  );
}
