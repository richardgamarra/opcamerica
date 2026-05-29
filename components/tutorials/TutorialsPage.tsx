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

export function TutorialsPage({ lang, t }: Props) {
  const [activeFilter, setActiveFilter] = useState(t.filters[0]);
  const isEs = lang === "es";

  const filtered = TUTORIALS.filter((tut) => {
    if (activeFilter === t.filters[0]) return true;
    const cat = isEs ? tut.categoryEs : tut.category;
    return cat === activeFilter;
  });

  return (
    <div className="min-h-screen bg-opc-light dark:bg-opc-dark">

      {/* Hero */}
      <section className="pt-28 pb-12 px-5 md:px-6 border-b border-gray-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-[11px] font-bold text-opc-orange uppercase tracking-widest mb-3">
            {isEs ? "Tutoriales" : "Tutorials"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-opc-dark dark:text-white tracking-tight leading-tight max-w-3xl">
            {t.heading}
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-500 dark:text-white/50 mt-4 max-w-2xl">
            {isEs
              ? "Guías paso a paso para fundar, lanzar y escalar tu One Person Company."
              : "Step-by-step guides for founding, launching, and scaling your One Person Company."}
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400 dark:text-white/40 font-sans">
            <span>✦ {TUTORIALS.length} {isEs ? "tutoriales" : "tutorials"}</span>
            <span>✦ EN + ES</span>
            <span>✦ {isEs ? "Actualizado 2026" : "Updated 2026"}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-14">

        {/* Filter chips */}
        <div className="overflow-x-auto pb-2 mb-4 -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
            {t.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans text-xs font-semibold px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-opc-orange text-white border-opc-orange"
                    : "bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:text-opc-dark dark:hover:text-white/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <p className="font-sans text-xs text-gray-400 dark:text-white/25 mb-6">
          {filtered.length} {isEs ? "tutoriales" : "tutorials"}
          {activeFilter !== t.filters[0] ? ` · ${activeFilter}` : ""}
        </p>

        {/* Tutorial grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tut) => {
            const title = isEs ? tut.titleEs : tut.titleEn;
            const category = isEs ? tut.categoryEs : tut.category;
            return (
              <Link
                key={tut.slug}
                href={`/${lang}/tutorials/${tut.slug}`}
                className="bg-white border border-gray-200 dark:bg-white/5 dark:border-white/8 rounded-xl p-6 flex flex-col hover:border-opc-orange/40 dark:hover:border-white/20 hover:shadow-sm transition-all group"
              >
                <span className="inline-block bg-opc-orange/10 text-opc-orange text-xs font-sans font-semibold px-3 py-1 rounded-full mb-4 self-start">
                  {category}
                </span>
                <h2 className="font-serif text-lg font-bold text-opc-dark dark:text-white mb-3 group-hover:text-opc-orange transition-colors leading-snug flex-1">
                  {title}
                </h2>
                <div className="flex items-center justify-between font-sans text-xs text-gray-400 dark:text-white/30 mt-2">
                  <span>{tut.readTime} {t.readTime}</span>
                  <span className="border border-gray-200 dark:border-white/15 px-2 py-0.5 rounded text-gray-400 dark:text-white/40 uppercase tracking-wide text-[10px]">
                    {tut.lang === "both" ? "EN + ES" : tut.lang.toUpperCase()}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
