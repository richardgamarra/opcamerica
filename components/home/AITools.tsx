"use client";

import { useState } from "react";
import Link from "next/link";
import type { Translations } from "@/lib/i18n";
import { AI_TOOLS, AI_TOOL_CATEGORIES, CORE_STACK } from "@/lib/content/aiTools";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["aiTools"];
}

export function AITools({ lang, t }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? AI_TOOLS
    : AI_TOOLS.filter(tool => tool.category === activeCategory);

  return (
    <section id="ai-tools" className="bg-opc-dark py-16 md:py-24 px-5 md:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-black text-white tracking-tight">{t.heading}</h2>
          <p className="font-sans text-sm md:text-base text-white/50 mt-2">{t.sub}</p>
        </div>

        {/* Core Stack Banner */}
        <div className="bg-gradient-to-r from-opc-orange/15 to-opc-orange/5 border border-opc-orange/30 rounded-2xl p-5 md:p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-opc-orange/10 border border-opc-orange/20 rounded-xl p-2.5 mt-0.5 shrink-0">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold text-opc-orange uppercase tracking-widest mb-1">Recommended Core Stack</p>
              <h3 className="font-sans font-bold text-white text-base md:text-lg leading-snug">{CORE_STACK.title}</h3>
              <p className="font-sans text-sm text-white/50 mt-0.5">{CORE_STACK.subtitle}</p>
              <p className="font-sans text-xs text-white/40 mt-1.5 max-w-lg">{CORE_STACK.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="font-sans text-2xl font-black text-white">${CORE_STACK.price}</p>
              <p className="font-sans text-xs text-white/40">one-time guide</p>
            </div>
            <Link
              href={`/${lang}/core-stack`}
              className="bg-opc-orange hover:bg-opc-orange/90 text-white font-sans font-bold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              Get the Core Stack →
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
            {AI_TOOL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-opc-orange text-white border-opc-orange"
                    : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tool count */}
        <p className="font-sans text-xs text-white/30 mb-5">
          {filtered.length} tool{filtered.length !== 1 ? "s" : ""} {activeCategory !== "All" ? `in ${activeCategory}` : "across all categories"}
        </p>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/8 rounded-xl p-5 flex flex-col hover:border-white/20 hover:bg-white/8 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{tool.logoEmoji}</span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {tool.isRecommended && (
                    <span className="bg-opc-orange/10 text-opc-orange text-[9px] font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      ★ Top Pick
                    </span>
                  )}
                  {tool.inCoreStack && (
                    <span className="bg-white/8 text-white/40 text-[9px] font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Core Stack
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-sans font-bold text-white mb-0.5 group-hover:text-opc-orange transition-colors">{tool.name}</h3>
              <p className="font-sans text-[11px] text-white/35 mb-2">{tool.category} · {tool.price}</p>
              <p className="font-sans text-sm text-white/55 leading-relaxed flex-1">{tool.description}</p>
              <p className="font-sans text-xs text-opc-orange mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Visit {tool.name} →
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
