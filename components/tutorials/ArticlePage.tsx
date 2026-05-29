"use client";

import Link from "next/link";
import type { Article, ArticleSection } from "@/lib/content/articles";
import type { Lang } from "@/lib/i18n";

interface Props {
  article: Article;
  lang: Lang;
}

function renderSection(section: ArticleSection, idx: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={idx} className="font-serif text-2xl md:text-3xl font-bold text-opc-dark dark:text-white mt-12 mb-4 leading-snug">
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="font-serif text-xl md:text-2xl font-bold text-opc-dark dark:text-white mt-8 mb-3 leading-snug">
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="font-sans text-base md:text-lg text-gray-700 dark:text-white/75 leading-relaxed mb-5">
          {section.content as string}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="font-sans text-base md:text-lg text-gray-700 dark:text-white/75 leading-relaxed mb-5 space-y-2 list-none pl-0">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-opc-orange mt-1 flex-shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="font-sans text-base md:text-lg text-gray-700 dark:text-white/75 leading-relaxed mb-5 space-y-3 list-none pl-0 counter-reset-[item]">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-serif font-black text-opc-orange text-lg w-6 flex-shrink-0">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote key={idx} className="border-l-4 border-opc-orange pl-6 my-8">
          <p className="font-serif text-xl md:text-2xl italic text-opc-dark dark:text-white/90 leading-snug">
            {section.content as string}
          </p>
        </blockquote>
      );
    case "callout":
      return (
        <div key={idx} className="bg-opc-orange/8 dark:bg-opc-orange/10 border border-opc-orange/20 rounded-xl p-6 my-8">
          {section.label && (
            <p className="font-sans text-xs font-bold text-opc-orange uppercase tracking-widest mb-2">{section.label}</p>
          )}
          <p className="font-sans text-base text-opc-dark dark:text-white/85 leading-relaxed">
            {section.content as string}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function ArticlePage({ article, lang }: Props) {
  const isEs = lang === "es";
  const title = isEs ? article.titleEs : article.titleEn;
  const excerpt = isEs ? article.excerptEs : article.excerptEn;
  const category = isEs ? article.categoryEs : article.category;
  const sections = isEs ? article.sectionsEs : article.sectionsEn;

  return (
    <div className="min-h-screen bg-opc-light dark:bg-opc-dark">
      {/* Hero */}
      <section className="pt-28 pb-10 px-5 md:px-6 border-b border-gray-200 dark:border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href={`/${lang}/tutorials`}
              className="font-sans text-xs text-gray-400 dark:text-white/40 hover:text-opc-orange dark:hover:text-opc-orange transition-colors"
            >
              {isEs ? "← Tutoriales" : "← Tutorials"}
            </Link>
            <span className="text-gray-300 dark:text-white/20">/</span>
            <span className="inline-block bg-opc-orange/10 text-opc-orange text-xs font-sans font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-opc-dark dark:text-white tracking-tight leading-tight mb-5">
            {title}
          </h1>

          <p className="font-sans text-base md:text-lg text-gray-500 dark:text-white/50 leading-relaxed mb-6">
            {excerpt}
          </p>

          <div className="flex items-center gap-4 font-sans text-xs text-gray-400 dark:text-white/30">
            <span>{article.readTime} {isEs ? "min de lectura" : "min read"}</span>
            <span>✦</span>
            <span>{article.lang === "both" ? "EN + ES" : article.lang.toUpperCase()}</span>
            <span>✦</span>
            <span>OPCAmerica</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-5 md:px-6 py-12 md:py-16">
        {sections.map((section, idx) => renderSection(section, idx))}

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-white/8">
          <p className="font-sans text-xs font-bold text-opc-orange uppercase tracking-widest mb-3">
            OPCAmerica
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-black text-opc-dark dark:text-white mb-4">
            {isEs ? "¿Listo para construir tu OPC?" : "Ready to build your OPC?"}
          </h3>
          <p className="font-sans text-base text-gray-500 dark:text-white/50 mb-6">
            {isEs
              ? "Únete a la comunidad bilingüe de fundadores independientes de las Américas."
              : "Join the bilingual community of solo founders across the Americas."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}#join`}
              className="font-sans text-sm font-semibold bg-opc-orange text-white px-5 py-2.5 rounded-full hover:bg-opc-orange/90 transition-colors"
            >
              {isEs ? "Únete Gratis →" : "Join Free →"}
            </Link>
            <Link
              href={`/${lang}/tutorials`}
              className="font-sans text-sm font-semibold border border-gray-200 dark:border-white/15 text-gray-600 dark:text-white/60 px-5 py-2.5 rounded-full hover:border-opc-orange/40 hover:text-opc-dark dark:hover:text-white/80 transition-colors"
            >
              {isEs ? "Más Tutoriales" : "More Tutorials"}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
