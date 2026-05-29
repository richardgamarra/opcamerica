import Link from "next/link";
import type { Translations } from "@/lib/i18n";
import { LAUNCHPAD_FEATURED } from "@/lib/content/launchpad";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["launchpad"];
}

export function LaunchPad({ lang, t }: Props) {
  return (
    <section id="launchpad" className="bg-opc-light dark:bg-opc-dark py-16 md:py-24 px-5 md:px-6 border-t border-gray-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-opc-dark dark:text-white mb-2 md:mb-3 tracking-tight">{t.heading}</h2>
        <p className="font-sans text-sm md:text-base text-opc-dark/50 dark:text-white/50 mb-8 md:mb-12">{t.sub}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {LAUNCHPAD_FEATURED.map((deal) => {
            const title = lang === "es" ? deal.titleEs : deal.titleEn;
            const desc = lang === "es" ? deal.descEs : deal.descEn;
            const pct = Math.round(((deal.totalClaims - deal.claimsLeft) / deal.totalClaims) * 100);

            return (
              <div key={deal.id} className="bg-white border border-gray-200 dark:bg-white/5 dark:border-white/8 rounded-xl p-5 md:p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <span className="text-lg">{deal.flag}</span>
                  <span className="font-sans text-xs text-gray-400 dark:text-white/40">{deal.founderName} · {deal.founderCountry}</span>
                </div>
                <h3 className="font-serif text-base md:text-lg font-bold text-opc-dark dark:text-white mb-2 leading-snug">{title}</h3>
                <p className="font-sans text-sm text-gray-500 dark:text-white/55 leading-relaxed flex-1 mb-4 md:mb-5">{desc}</p>

                <div className="border border-opc-orange/30 bg-opc-orange/5 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                  <div className="flex justify-between items-center mb-2 md:mb-3">
                    <span className="font-sans font-black text-opc-orange text-base md:text-lg">{deal.discount}</span>
                    <span className="font-sans text-xs text-gray-400 dark:text-white/40">{deal.claimsLeft} {t.claimsLeft}</span>
                  </div>
                  <div className="h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-opc-orange rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-gray-400 dark:text-white/30">▲ {deal.votes} {t.votes}</span>
                  <Link href={`/${lang}/launchpad/${deal.id}`}
                        className="bg-opc-orange text-white font-sans font-bold text-sm px-4 md:px-5 py-2 rounded-lg hover:bg-opc-orange/90 transition-colors">
                    {t.claim}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
