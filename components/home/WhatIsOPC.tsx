import type { Translations } from "@/lib/i18n";

interface Props {
  t: Translations["whatIsOpc"];
}

export function WhatIsOPC({ t }: Props) {
  const stats = [t.stat1, t.stat2, t.stat3];

  return (
    <section className="bg-white dark:bg-white/5 dark:border-t dark:border-white/5 py-16 md:py-24 px-5 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-opc-dark dark:text-white mb-5 md:mb-6 tracking-tight">
          {t.heading}
        </h2>
        <p className="font-sans text-base md:text-lg text-gray-600 dark:text-white/50 leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
          {t.body}
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-12">
          {stats.map(({ value, label }) => (
            <div key={value} className="text-center">
              <div className="font-serif text-3xl md:text-5xl font-black text-opc-orange mb-1 md:mb-2">{value}</div>
              <div className="font-sans text-xs md:text-sm text-gray-500 dark:text-white/40">{label}</div>
            </div>
          ))}
        </div>

        <a href="#pillars" className="font-sans text-sm font-semibold text-opc-orange hover:underline">
          {t.link}
        </a>
      </div>
    </section>
  );
}
