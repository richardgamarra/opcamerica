import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getTranslations } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { LAUNCHPAD_FEATURED } from "@/lib/content/launchpad";
import pool from "@/lib/db";
import Link from "next/link";

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
  const lp = t.launchpadPage;
  const isEs = lang === "es";
  const dbPerks = await getLivePerks();

  return (
    <>
      <Nav lang={lang} t={t.nav} />

      <main>

        {/* ── Hero — always dark like homepage ── */}
        <section className="relative bg-opc-dark pt-32 pb-24 px-5 md:px-12 overflow-hidden border-b border-white/5">
          {/* dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(232,82,42,0.25) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }} />
          {/* orange glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{
            background: "radial-gradient(ellipse at top right, rgba(232,82,42,0.18) 0%, transparent 65%)",
          }} />

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px bg-opc-orange" />
              <span className="font-sans text-[11px] tracking-[3px] text-white/35 uppercase">{lp.eyebrow}</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-5">
              {lp.heading}<span className="text-opc-orange">{lp.headingAccent}</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-white/55 max-w-xl mb-12 leading-relaxed">
              {lp.sub}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {lp.stats.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl px-4 py-4">
                  <p className="font-serif text-2xl md:text-3xl font-black text-opc-orange">{s.value}</p>
                  <p className="font-sans text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 items-center">
              {lp.categories.map((cat, i) => (
                <button key={cat} className={`font-sans text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                  i === 0
                    ? "bg-opc-orange text-white border-opc-orange"
                    : "border-white/15 text-white/50 hover:border-opc-orange/60 hover:text-opc-orange"
                }`}>
                  {cat}
                </button>
              ))}
              <div className="ml-auto hidden md:flex items-center gap-2">
                <span className="font-sans text-xs text-white/30">{lp.sortLabel}</span>
                {lp.sortOptions.map((opt, i) => (
                  <button key={opt} className={`font-sans text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    i === 0
                      ? "border-opc-orange/40 text-opc-orange bg-opc-orange/10"
                      : "border-white/10 text-white/40 hover:border-opc-orange/30"
                  }`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured deals — dark section ── */}
        <section className="bg-opc-dark py-20 px-5 md:px-12 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-1">{lp.featuredEyebrow}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-black text-white">{lp.featuredHeading}</h2>
              </div>
              <span className="hidden md:flex items-center gap-2 font-sans text-xs text-white/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {lp.updatedToday}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LAUNCHPAD_FEATURED.map((deal, idx) => {
                const title = isEs ? deal.titleEs : deal.titleEn;
                const desc = isEs ? deal.descEs : deal.descEn;
                const pct = Math.round(((deal.totalClaims - deal.claimsLeft) / deal.totalClaims) * 100);
                const isFeatured = idx === 0;

                return (
                  <div key={deal.id} className={`relative rounded-2xl flex flex-col ${
                    isFeatured
                      ? "bg-white/8 border border-opc-orange/40 shadow-[0_0_50px_rgba(232,82,42,0.15)]"
                      : "bg-white/5 border border-white/8 hover:border-white/15 transition-all"
                  }`}>
                    {isFeatured && (
                      <div className="absolute -top-3 left-5">
                        <span className="font-sans text-[10px] font-black tracking-[1.5px] uppercase bg-opc-orange text-white px-3 py-1 rounded-full">
                          {lp.topPick}
                        </span>
                      </div>
                    )}
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{deal.flag}</span>
                        <span className="font-sans text-xs text-white/40">{deal.founderName} · {deal.founderCountry}</span>
                        <span className="ml-auto font-sans text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/8 text-white/50">▲ {deal.votes}</span>
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-white leading-snug mb-2">{title}</h3>
                      <p className="font-sans text-sm text-white/50 leading-relaxed flex-1 mb-5">{desc}</p>

                      <div className="rounded-xl p-4 mb-4 bg-opc-orange/10 border border-opc-orange/25">
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="font-sans font-black text-opc-orange text-xl">{deal.discount}</span>
                          <span className="font-sans text-xs text-white/40">{deal.claimsLeft} {lp.left}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                          <div className="h-full bg-opc-orange rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="font-sans text-[10px] mt-1.5 text-white/25">{pct}% {lp.claimed}</p>
                      </div>

                      <Link href={`/${lang}/launchpad/${deal.id}`} className={`w-full text-center font-sans font-bold text-sm py-3 rounded-xl transition-colors ${
                        isFeatured
                          ? "bg-opc-orange text-white hover:bg-opc-orange/90 shadow-[0_4px_20px_rgba(232,82,42,0.4)]"
                          : "bg-white/8 text-white hover:bg-opc-orange hover:shadow-[0_4px_20px_rgba(232,82,42,0.3)]"
                      }`}>
                        {lp.claimNow}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Live perks from DB ── */}
        {dbPerks.length > 0 && (
          <section className="bg-opc-dark py-20 px-5 md:px-12 border-b border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-1">{lp.perksEyebrow}</p>
                <h2 className="font-serif text-2xl md:text-3xl font-black text-white">{lp.perksHeading}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {dbPerks.map((perk) => (
                  <div key={perk.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-opc-orange/40 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{perk.logo}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-sans font-bold text-sm text-white truncate">{perk.brand}</p>
                        <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/8 text-white/50">{perk.category}</span>
                      </div>
                    </div>
                    <p className="font-sans text-sm text-white/55 leading-relaxed flex-1">
                      {isEs && perk.offer_es ? perk.offer_es : perk.offer}
                    </p>
                    {perk.is_elite && (
                      <span className="font-sans text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 self-start">{lp.eliteOnly}</span>
                    )}
                    <Link href={`/${lang}/auth/signup`} className="font-sans font-bold text-xs text-center py-2.5 rounded-xl bg-white/8 text-white hover:bg-opc-orange transition-colors">
                      {lp.joinToClaim}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── How it works — dark section ── */}
        <section className="bg-opc-dark py-20 px-5 md:px-12 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-2">{lp.howEyebrow}</p>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-white">{lp.howHeading}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {lp.steps.map(({ step, title, body }) => (
                <div key={step} className="flex gap-5">
                  <span className="font-serif text-5xl font-black text-opc-orange/15 leading-none flex-shrink-0">{step}</span>
                  <div className="pt-2">
                    <h3 className="font-serif text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="font-sans text-sm text-white/45 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-opc-dark py-24 px-5 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-[11px] font-bold tracking-[2px] text-opc-orange uppercase mb-4">{lp.ctaEyebrow}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{lp.ctaHeading}</h2>
            <p className="font-sans text-sm md:text-base text-white/50 mb-10 leading-relaxed">{lp.ctaSub}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${lang}/auth/signup`} className="bg-opc-orange text-white font-sans font-bold text-sm px-8 py-4 rounded-xl hover:bg-opc-orange/90 transition-colors shadow-[0_4px_28px_rgba(232,82,42,0.35)]">
                {lp.ctaPrimary}
              </Link>
              <Link href={`/${lang}/auth/signin`} className="bg-white/8 text-white font-sans font-semibold text-sm px-8 py-4 rounded-xl border border-white/15 hover:border-opc-orange/60 transition-colors">
                {lp.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer lang={lang} t={t.footer} />
    </>
  );
}
