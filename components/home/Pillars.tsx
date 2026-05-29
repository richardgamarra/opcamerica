import Link from "next/link";
import type { Translations } from "@/lib/i18n";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["pillars"];
}

const PILLAR_CONFIG = [
  { key: "launchpad"  as const, emoji: "🚀", color: "from-blue-900/50 to-blue-800/20",    border: "border-blue-700/30",   href: "launchpad"  },
  { key: "community"  as const, emoji: "👥", color: "from-green-900/50 to-green-800/20",  border: "border-green-700/30",  href: "community"  },
  { key: "aiTools"    as const, emoji: "🤖", color: "from-purple-900/50 to-purple-800/20", border: "border-purple-700/30", href: "ai-tools"   },
  { key: "consulting" as const, emoji: "💼", color: "from-orange-900/50 to-orange-800/20", border: "border-orange-700/30", href: "consulting" },
];

export function Pillars({ lang, t }: Props) {
  return (
    <section id="pillars" className="bg-opc-dark py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-white text-center mb-10 md:mb-14 tracking-tight">
          {t.heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {PILLAR_CONFIG.map(({ key, emoji, color, border, href }) => (
            <div key={key} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 md:p-8`}>
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{emoji}</div>
              <h3 className="font-serif text-xl md:text-2xl font-black text-white mb-2 md:mb-3">
                {t[key].title}
              </h3>
              <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed mb-5 md:mb-6">
                {t[key].desc}
              </p>
              <Link href={`/${lang}/${href}`} className="font-sans text-sm font-semibold text-white/80 hover:text-white">
                {t.explore}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
