import Link from "next/link";
import type { Translations } from "@/lib/i18n";
import { AI_TOOLS_PREVIEW } from "@/lib/content/aiTools";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["aiTools"];
}

export function AITools({ lang, t }: Props) {
  return (
    <section id="ai-tools" className="bg-opc-dark py-16 md:py-24 px-5 md:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-3 md:mb-4 gap-2">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white tracking-tight">{t.heading}</h2>
            <p className="font-sans text-sm md:text-base text-white/50 mt-2">{t.sub}</p>
          </div>
          <Link href={`/${lang}/ai-tools`} className="font-sans text-sm font-semibold text-opc-orange hover:underline hidden sm:block">
            {t.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 md:mt-10">
          {AI_TOOLS_PREVIEW.map((tool) => (
            <div key={tool.name} className="bg-white/5 border border-white/8 rounded-xl p-5 md:p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl md:text-3xl">{tool.logoEmoji}</span>
                {tool.hasDeal && (
                  <span className="bg-opc-orange/10 text-opc-orange text-[10px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Deal
                  </span>
                )}
              </div>
              <h3 className="font-sans font-bold text-white mb-1">{tool.name}</h3>
              <p className="font-sans text-xs text-white/40 mb-1">{tool.category}</p>
              <p className="font-sans text-sm text-white/60 leading-relaxed flex-1">{tool.description}</p>
              {tool.hasDeal && (
                <Link href={`/${lang}/ai-tools`} className="mt-4 font-sans text-sm font-semibold text-opc-orange hover:underline">
                  {t.deal}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href={`/${lang}/ai-tools`} className="font-sans text-sm font-semibold text-opc-orange hover:underline">
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
