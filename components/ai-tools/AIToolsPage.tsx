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

export function AIToolsPage({ lang, t }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? AI_TOOLS
    : AI_TOOLS.filter(tool => tool.category === activeCategory);

  const isEs = lang === "es";

  return (
    <div className="min-h-screen bg-opc-dark">

      {/* Hero */}
      <section className="pt-28 pb-12 px-5 md:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-[11px] font-bold text-opc-orange uppercase tracking-widest mb-3">
            {isEs ? "Herramientas IA" : "AI Tools"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl">
            {t.heading}
          </h1>
          <p className="font-sans text-base md:text-lg text-white/50 mt-4 max-w-2xl">
            {t.sub}
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-white/40 font-sans">
            <span>✦ {AI_TOOLS.length} {isEs ? "herramientas curadas" : "curated tools"}</span>
            <span>✦ 13 {isEs ? "categorías" : "categories"}</span>
            <span>✦ {isEs ? "Actualizado 2026" : "Updated 2026"}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-14">

        {/* Core Stack Banner */}
        <div className="bg-gradient-to-r from-opc-orange/15 to-opc-orange/5 border border-opc-orange/30 rounded-2xl p-6 md:p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-opc-orange/10 border border-opc-orange/20 rounded-xl p-3 shrink-0">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <p className="font-sans text-[11px] font-bold text-opc-orange uppercase tracking-widest mb-1">
                  {isEs ? "Recomendado" : "Recommended"}
                </p>
                <h2 className="font-sans font-black text-white text-xl md:text-2xl leading-snug">
                  {CORE_STACK.title}
                </h2>
                <p className="font-sans text-sm text-white/50 mt-1">{CORE_STACK.subtitle}</p>
                <p className="font-sans text-sm text-white/40 mt-2 max-w-xl">{CORE_STACK.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {CORE_STACK.tools.slice(0, 8).map(tool => (
                    <span key={tool.name} className="font-sans text-[11px] text-white/40 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                      {tool.logoEmoji} {tool.name}
                    </span>
                  ))}
                  <span className="font-sans text-[11px] text-white/30 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                    +{CORE_STACK.tools.length - 8} {isEs ? "más" : "more"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div className="md:text-right">
                <p className="font-sans text-3xl font-black text-white">${CORE_STACK.price}</p>
                <p className="font-sans text-xs text-white/40">{isEs ? "guía única" : "one-time guide"}</p>
                <p className="font-sans text-xs text-opc-orange mt-1">
                  {isEs ? "Valor: ~$271/mo en herramientas" : "Value: ~$271/mo in tools"}
                </p>
              </div>
              <Link
                href={`/${lang}/core-stack`}
                className="bg-opc-orange hover:bg-opc-orange/90 text-white font-sans font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                {isEs ? "Obtener el Core Stack →" : "Get the Core Stack →"}
              </Link>
              <p className="font-sans text-[11px] text-white/25">
                {isEs ? "Acceso inmediato · Pago único" : "Instant access · One-time payment"}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto pb-2 mb-4 -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
            {AI_TOOL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-xs font-semibold px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
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

        <p className="font-sans text-xs text-white/25 mb-6">
          {filtered.length} {isEs ? "herramientas" : "tools"}
          {activeCategory !== "All" ? ` ${isEs ? "en" : "in"} ${activeCategory}` : ""}
        </p>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <h3 className="font-sans font-bold text-white mb-0.5 group-hover:text-opc-orange transition-colors">
                {tool.name}
              </h3>
              <p className="font-sans text-[11px] text-white/35 mb-2">
                {tool.category} · {tool.price}
              </p>
              <p className="font-sans text-sm text-white/55 leading-relaxed flex-1">
                {tool.description}
              </p>
              <p className="font-sans text-xs text-opc-orange mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {isEs ? `Visitar ${tool.name} →` : `Visit ${tool.name} →`}
              </p>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
