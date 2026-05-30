import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getTranslations } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { LAUNCHPAD_FEATURED } from "@/lib/content/launchpad";
import pool from "@/lib/db";
import Link from "next/link";

const CATEGORIES_EN = ["All", "Playbooks", "Tools", "Legal", "Templates", "Courses"];
const CATEGORIES_ES = ["Todo", "Playbooks", "Herramientas", "Legal", "Plantillas", "Cursos"];

const SORT_OPTIONS_EN = ["Most Voted", "Newest", "Ending Soon"];
const SORT_OPTIONS_ES = ["Mas Votados", "Mas Recientes", "Terminan Pronto"];

async function getLivePerks() {
  try {
    const result = await pool.query(
      "SELECT * FROM perks WHERE is_active = true ORDER BY created_at DESC"
    );
    return result.rows;
  } catch {
    return [];
  }
}

export default async function LaunchPadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const t = getTranslations(lang);
  const isEs = lang === "es";
  const dbPerks = await getLivePerks();

  const categories = isEs ? CATEGORIES_ES : CATEGORIES_EN;
  const sortOptions = isEs ? SORT_OPTIONS_ES : SORT_OPTIONS_EN;

  const stats = [
    { value: "120+", label: isEs ? "Founders activos" : "Active founders" },
    { value: "18", label: isEs ? "Paises representados" : "Countries represented" },
    { value: "$2.4M", label: isEs ? "En valor reclamado" : "In claimed value" },
    { value: "48h", label: isEs ? "Actualizacion promedio" : "Avg. refresh" },
  ];

  return (
    <>
      <Nav lang={lang} t={t.nav} />

      <main className="min-h-screen bg-opc-light dark:bg-opc-dark transition-colors">

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-5 md:px-12 overflow-hidden border-b border-black/8 dark:border-white/5">
          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(232,82,42,0.08) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
          {/* Orange glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 dark:opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, #e8522a 0%, transparent 70%)", filter: "blur(60px)" }} />

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-opc-orange" />
              <span className="font-sans text-[11px] tracking-[3px] text-opc-dark/40 dark:text-white/40 uppercase">
                {isEs ? "Descubrimiento · Beneficios · Deals" : "Discovery · Deals · Benefits"}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-black text-opc-dark dark:text-white leading-none tracking-tight mb-4">
              {isEs ? "Launch" : "Launch"}<span className="text-opc-orange">Pad</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-opc-dark/55 dark:text-white/55 max-w-xl mb-10 leading-relaxed">
              {isEs
                ? "Recursos exclusivos, deals y herramientas curadas para founders OPC. Nuevas oportunidades cada semana."
                : "Exclusive resources, deals, and tools curated for OPC founders. New opportunities every week."}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/60 dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-xl px-4 py-4 backdrop-blur-sm">
                  <p className="font-serif text-2xl md:text-3xl font-black text-opc-orange">{s.value}</p>
                  <p className="font-sans text-xs text-opc-dark/50 dark:text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat, i) => (
                <button key={cat} className={`font-sans text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                  i === 0
                    ? "bg-opc-orange text-white border-opc-orange"
                    : "bg-transparent border-black/15 dark:border-white/15 text-opc-dark/60 dark:text-white/60 hover:border-opc-orange/50 hover:text-opc-orange"
                }`}>
                  {cat}
                </button>
              ))}
              <div className="ml-auto hidden md:flex items-center gap-2">
                <span className="font-sans text-xs text-opc-dark/40 dark:text-white/30">
                  {isEs ? "Ordenar:" : "Sort:"}
                </span>
                {sortOptions.map((opt, i) => (
                  <button key={opt} className={`font-sans text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    i === 0
                      ? "border-opc-orange/40 text-opc-orange bg-opc-orange/8"
                      : "border-black/10 dark:border-white/10 text-opc-dark/50 dark:text-white/40 hover:border-opc-orange/30"
                  }`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured deals from static content */}
        <section className="py-16 px-5 md:px-12 border-b border-black/8 dark:border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-1">
                  {isEs ? "Destacados esta semana" : "Featured this week"}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-black text-opc-dark dark:text-white">
                  {isEs ? "Oportunidades top" : "Top opportunities"}
                </h2>
              </div>
              <span className="hidden md:flex items-center gap-2 font-sans text-xs text-opc-dark/40 dark:text-white/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {isEs ? "Actualizado hoy" : "Updated today"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LAUNCHPAD_FEATURED.map((deal, idx) => {
                const title = isEs ? deal.titleEs : deal.titleEn;
                const desc = isEs ? deal.descEs : deal.descEn;
                const pct = Math.round(((deal.totalClaims - deal.claimsLeft) / deal.totalClaims) * 100);
                const isFeatured = idx === 0;

                return (
                  <div
                    key={deal.id}
                    className={`relative rounded-2xl flex flex-col transition-all duration-200 group ${
                      isFeatured
                        ? "bg-opc-dark dark:bg-white/6 border border-opc-orange/30 shadow-[0_0_40px_rgba(232,82,42,0.12)]"
                        : "bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 hover:shadow-md"
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3 left-5">
                        <span className="font-sans text-[10px] font-black tracking-[1.5px] uppercase bg-opc-orange text-white px-3 py-1 rounded-full">
                          {isEs ? "Mas popular" : "Top pick"}
                        </span>
                      </div>
                    )}

                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{deal.flag}</span>
                        <span className={`font-sans text-xs ${isFeatured ? "text-white/40" : "text-opc-dark/40 dark:text-white/40"}`}>
                          {deal.founderName} · {deal.founderCountry}
                        </span>
                        <span className={`ml-auto font-sans text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isFeatured ? "bg-white/10 text-white/60" : "bg-opc-dark/5 dark:bg-white/8 text-opc-dark/50 dark:text-white/50"
                        }`}>
                          ▲ {deal.votes}
                        </span>
                      </div>

                      <h3 className={`font-serif text-lg md:text-xl font-bold leading-snug mb-2 ${
                        isFeatured ? "text-white" : "text-opc-dark dark:text-white"
                      }`}>{title}</h3>
                      <p className={`font-sans text-sm leading-relaxed flex-1 mb-5 ${
                        isFeatured ? "text-white/55" : "text-opc-dark/50 dark:text-white/50"
                      }`}>{desc}</p>

                      {/* Discount + progress */}
                      <div className={`rounded-xl p-4 mb-4 border ${
                        isFeatured
                          ? "bg-opc-orange/15 border-opc-orange/30"
                          : "bg-opc-orange/5 border-opc-orange/20"
                      }`}>
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="font-sans font-black text-opc-orange text-xl">{deal.discount}</span>
                          <span className={`font-sans text-xs ${isFeatured ? "text-white/50" : "text-opc-dark/40 dark:text-white/40"}`}>
                            {deal.claimsLeft} {isEs ? "restantes" : "left"}
                          </span>
                        </div>
                        <div className={`h-1.5 rounded-full overflow-hidden ${isFeatured ? "bg-white/10" : "bg-black/8 dark:bg-white/10"}`}>
                          <div className="h-full bg-opc-orange rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <p className={`font-sans text-[10px] mt-1.5 ${isFeatured ? "text-white/30" : "text-opc-dark/30 dark:text-white/30"}`}>
                          {pct}% {isEs ? "reclamado" : "claimed"}
                        </p>
                      </div>

                      <Link
                        href={`/${lang}/launchpad/${deal.id}`}
                        className={`w-full text-center font-sans font-bold text-sm py-3 rounded-xl transition-colors ${
                          isFeatured
                            ? "bg-opc-orange text-white hover:bg-opc-orange/90 shadow-[0_4px_20px_rgba(232,82,42,0.4)]"
                            : "bg-opc-dark dark:bg-white text-white dark:text-opc-dark hover:bg-opc-dark/85 dark:hover:bg-white/90"
                        }`}
                      >
                        {isEs ? "Reclamar ahora" : "Claim now"} →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live perks from DB */}
        {dbPerks.length > 0 && (
          <section className="py-16 px-5 md:px-12 border-b border-black/8 dark:border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-1">
                  {isEs ? "Beneficios exclusivos" : "Member perks"}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-black text-opc-dark dark:text-white">
                  {isEs ? "Herramientas y descuentos" : "Tools & discounts"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dbPerks.map((perk) => (
                  <div
                    key={perk.id}
                    className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-5 flex flex-col gap-3 hover:border-opc-orange/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{perk.logo}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-sans font-bold text-sm text-opc-dark dark:text-white truncate">{perk.brand}</p>
                        <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full bg-opc-dark/5 dark:bg-white/8 text-opc-dark/50 dark:text-white/50">
                          {perk.category}
                        </span>
                      </div>
                    </div>
                    <p className="font-sans text-sm text-opc-dark/60 dark:text-white/55 leading-relaxed flex-1">
                      {isEs && perk.offer_es ? perk.offer_es : perk.offer}
                    </p>
                    {perk.is_elite && (
                      <span className="font-sans text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 self-start">
                        Elite only
                      </span>
                    )}
                    <Link
                      href={`/${lang}/auth/signup`}
                      className="font-sans font-bold text-xs text-center py-2.5 rounded-xl bg-opc-dark/5 dark:bg-white/8 text-opc-dark dark:text-white hover:bg-opc-orange hover:text-white dark:hover:bg-opc-orange transition-colors border border-transparent hover:border-transparent"
                    >
                      {isEs ? "Unirse para reclamar" : "Join to claim"} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="py-16 px-5 md:px-12 border-b border-black/8 dark:border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-2">
                {isEs ? "Como funciona" : "How it works"}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-opc-dark dark:text-white">
                {isEs ? "Simple. Rapido. Para founders." : "Simple. Fast. Built for founders."}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  en: { title: "Join free", body: "Create your OPCAmerica account in 30 seconds. No credit card required." },
                  es: { title: "Registrate gratis", body: "Crea tu cuenta de OPCAmerica en 30 segundos. Sin tarjeta de credito." },
                },
                {
                  step: "02",
                  en: { title: "Browse deals", body: "Explore curated resources, tools, and discounts added weekly for OPC founders." },
                  es: { title: "Explora los deals", body: "Explora recursos, herramientas y descuentos curados cada semana para founders OPC." },
                },
                {
                  step: "03",
                  en: { title: "Claim & grow", body: "Claim your deal with one click. Access codes and resources instantly in your dashboard." },
                  es: { title: "Reclama y crece", body: "Reclama tu deal con un click. Accede a codigos y recursos al instante en tu dashboard." },
                },
              ].map(({ step, en, es }) => {
                const content = isEs ? es : en;
                return (
                  <div key={step} className="flex gap-5">
                    <div className="flex-shrink-0">
                      <span className="font-serif text-4xl font-black text-opc-orange/20 dark:text-opc-orange/15 leading-none">{step}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-serif text-lg font-bold text-opc-dark dark:text-white mb-2">{content.title}</h3>
                      <p className="font-sans text-sm text-opc-dark/50 dark:text-white/50 leading-relaxed">{content.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-5 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-4">
              {isEs ? "Empieza hoy" : "Start today"}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-opc-dark dark:text-white mb-4 leading-tight">
              {isEs
                ? "Accede a todos los deals. Gratis."
                : "Get access to all deals. Free."}
            </h2>
            <p className="font-sans text-sm md:text-base text-opc-dark/50 dark:text-white/50 mb-8 leading-relaxed">
              {isEs
                ? "Unete a la comunidad OPCAmerica y accede a deals exclusivos, playbooks y herramientas curadas para founders."
                : "Join the OPCAmerica community and unlock exclusive deals, playbooks, and curated tools for founders."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${lang}/auth/signup`}
                className="bg-opc-orange text-white font-sans font-bold text-sm px-8 py-4 rounded-xl hover:bg-opc-orange/90 transition-colors shadow-[0_4px_28px_rgba(232,82,42,0.4)]"
              >
                {isEs ? "Crear cuenta gratis" : "Create free account"} →
              </Link>
              <Link
                href={`/${lang}/auth/signin`}
                className="bg-opc-dark/6 dark:bg-white/6 text-opc-dark dark:text-white font-sans font-semibold text-sm px-8 py-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors"
              >
                {isEs ? "Ya tengo cuenta" : "I already have an account"}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer lang={lang} t={t.footer} />
    </>
  );
}
