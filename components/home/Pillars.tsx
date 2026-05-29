import Link from "next/link";
import type { Translations } from "@/lib/i18n";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["pillars"];
}

const PILLAR_CONFIG = [
  { key: "launchpad"  as const, emoji: "🚀", href: "launchpad",  lightBg: "bg-blue-50 border-blue-200",   darkBg: "dark:bg-blue-900/20 dark:border-blue-700/30" },
  { key: "community"  as const, emoji: "👥", href: "community",  lightBg: "bg-green-50 border-green-200",  darkBg: "dark:bg-green-900/20 dark:border-green-700/30" },
  { key: "aiTools"    as const, emoji: "🤖", href: "ai-tools",   lightBg: "bg-purple-50 border-purple-200", darkBg: "dark:bg-purple-900/20 dark:border-purple-700/30" },
  { key: "consulting" as const, emoji: "💼", href: "consulting", lightBg: "bg-orange-50 border-orange-200", darkBg: "dark:bg-orange-900/20 dark:border-orange-700/30" },
];

export function Pillars({ lang, t }: Props) {
  return (
    <section id="pillars" className="bg-opc-light dark:bg-opc-dark py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-opc-dark dark:text-white text-center mb-10 md:mb-14 tracking-tight">
          {t.heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {PILLAR_CONFIG.map(({ key, emoji, lightBg, darkBg, href }) => (
            <div key={key} className={`border rounded-2xl p-6 md:p-8 ${lightBg} ${darkBg}`}>
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{emoji}</div>
              <h3 className="font-serif text-xl md:text-2xl font-black text-opc-dark dark:text-white mb-2 md:mb-3">
                {t[key].title}
              </h3>
              <p className="font-sans text-sm md:text-base text-opc-dark/60 dark:text-white/60 leading-relaxed mb-5 md:mb-6">
                {t[key].desc}
              </p>
              <Link href={`/${lang}/${href}`} className="font-sans text-sm font-semibold text-opc-orange hover:underline">
                {t.explore}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
