"use client";

import { useState } from "react";
import Link from "next/link";
import type { Translations } from "@/lib/i18n";
import { TUTORIALS } from "@/lib/content/tutorials";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["tutorials"];
}

export function Tutorials({ lang, t }: Props) {
  const [activeFilter, setActiveFilter] = useState(t.filters[0]);

  const filtered = TUTORIALS.filter((tut) => {
    if (activeFilter === t.filters[0]) return true;
    const cat = lang === "es" ? tut.categoryEs : tut.category;
    return cat === activeFilter;
  });

  return (
    <section id="tutorials" className="bg-white dark:bg-opc-dark py-16 md:py-24 px-5 md:px-6 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-opc-dark dark:text-white mb-6 md:mb-8 tracking-tight">
          {t.heading}
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 scrollbar-hide">
          {t.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-sans text-sm transition-colors ${
                activeFilter === filter
                  ? "bg-opc-orange text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((tut) => {
            const title = lang === "es" ? tut.titleEs : tut.titleEn;
            const category = lang === "es" ? tut.categoryEs : tut.category;
            return (
              <Link key={tut.slug} href={`/${lang}/tutorials/${tut.slug}`}
                    className="bg-gray-50 border border-gray-200 dark:bg-white/5 dark:border-white/8 rounded-xl p-5 md:p-6 hover:border-gray-300 dark:hover:bg-white/8 transition-colors group">
                <span className="inline-block bg-opc-orange/10 text-opc-orange text-xs font-sans font-semibold px-3 py-1 rounded-full mb-3 md:mb-4">
                  {category}
                </span>
                <h3 className="font-serif text-base md:text-lg font-bold text-opc-dark dark:text-white mb-2 md:mb-3 group-hover:text-opc-orange transition-colors leading-snug">
                  {title}
                </h3>
                <div className="flex items-center gap-3 font-sans text-xs text-gray-400 dark:text-white/30">
                  <span>{tut.readTime} {t.readTime}</span>
                  <span className="border border-gray-300 dark:border-white/20 px-2 py-0.5 rounded text-gray-400 dark:text-white/40 uppercase tracking-wide text-[10px]">
                    {tut.lang === "both" ? "EN + ES" : tut.lang.toUpperCase()}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
