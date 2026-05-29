import Image from "next/image";
import Link from "next/link";
import type { Translations } from "@/lib/i18n";

type Lang = "en" | "es";

const CITY_PINS = [
  { label: "Toronto",     top: "18%", right: "25%", accent: true  },
  { label: "New York",    top: "25%", right: "21%", accent: false },
  { label: "Mexico City", top: "44%", right: "32%", accent: true  },
  { label: "Bogotá",      top: "55%", right: "26%", accent: false },
  { label: "São Paulo",   top: "69%", right: "13%", accent: true  },
  { label: "Santiago",    top: "79%", right: "27%", accent: false },
];

const AVATARS = [
  { code: "MX", bg: "bg-blue-700" },
  { code: "BR", bg: "bg-green-700" },
  { code: "US", bg: "bg-purple-700" },
  { code: "CO", bg: "bg-opc-orange" },
  { code: "CL", bg: "bg-sky-700" },
  { code: "AR", bg: "bg-amber-700" },
];

interface HeroProps {
  lang: Lang;
  t: Translations["hero"];
}

export function Hero({ lang, t }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center bg-opc-dark">
      {/* Earth image — right side, desktop only */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute right-0 top-0 w-[65%] h-full" style={{ transform: "translateY(-5%)", height: "110%" }}>
          <Image
            src="/images/earth3.png"
            alt="Americas from space"
            fill
            priority
            className="object-cover object-center"
            sizes="65vw"
          />
        </div>
      </div>

      {/* Mobile: full-width earth image with heavy overlay */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/earth3.png"
          alt="Americas from space"
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays (desktop) */}
      <div className="absolute inset-0 z-10 hidden md:block" style={{
        background: "linear-gradient(to right, #080d14 0%, #080d14 35%, rgba(8,13,20,0.92) 48%, rgba(8,13,20,0.60) 62%, rgba(8,13,20,0.20) 80%, rgba(8,13,20,0.05) 100%)"
      }} />
      <div className="absolute inset-0 z-10 hidden md:block" style={{
        background: "linear-gradient(to right, transparent 35%, rgba(4,10,25,0.45) 100%)"
      }} />

      {/* Bottom fade — all screen sizes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10"
           style={{ background: "linear-gradient(to top, #080d14 0%, transparent 100%)" }} />

      {/* City pins — desktop only */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
        {CITY_PINS.map(({ label, top, right, accent }) => (
          <div key={label} className="absolute flex items-center gap-2" style={{ top, right }}>
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
              accent
                ? "bg-opc-orange shadow-[0_0_0_3px_rgba(232,82,42,0.25),0_0_16px_rgba(232,82,42,0.6)]"
                : "bg-white/75 shadow-[0_0_0_3px_rgba(255,255,255,0.15),0_0_10px_rgba(255,255,255,0.4)]"
            }`} />
            <span className="font-sans text-[10px] font-bold text-white/80 bg-opc-dark/60 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-white/10 whitespace-nowrap tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-30 px-5 md:px-12 pt-28 md:pt-32 pb-16 md:pb-20 max-w-2xl">
        <p className="font-sans text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] text-white/40 uppercase mb-6 md:mb-7 flex items-center gap-3">
          <span className="w-6 md:w-8 h-px bg-opc-orange flex-shrink-0" />
          {t.eyebrow}
        </p>

        <h1 className="font-serif text-5xl md:text-[68px] font-black leading-none tracking-[-1px] md:tracking-[-1.5px] mb-5">
          {t.line1}<br />
          {t.line2}<br />
          <em className="text-opc-orange not-italic">{t.line3}</em>
        </h1>

        <div className="inline-flex items-center gap-2 mb-5 md:mb-6 font-sans text-[9px] md:text-[10px] tracking-[2px] md:tracking-[2.5px] text-white/38 uppercase border border-white/10 px-3 md:px-4 py-1.5 rounded">
          <span className="w-1.5 h-1.5 bg-opc-orange rounded-full" />
          {t.badge}
        </div>

        <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed mb-2 max-w-md">
          {t.sub}
        </p>
        <p className="font-sans text-xs md:text-sm text-white/30 italic leading-relaxed mb-8 md:mb-9 max-w-md">
          {t.subEs}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center mb-8 md:mb-10">
          <Link
            href={`/${lang}/join`}
            className="bg-opc-orange text-white px-6 md:px-8 py-4 rounded-lg font-sans font-bold text-sm md:text-base text-center shadow-[0_4px_28px_rgba(232,82,42,0.5)] hover:bg-opc-orange/90 transition-colors"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href={`/${lang}/#community`}
            className="border border-white/20 text-white/72 px-5 md:px-7 py-4 rounded-lg font-sans text-sm md:text-base text-center hover:border-white/40 transition-colors"
          >
            {t.ctaSecondary}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex">
            {AVATARS.map(({ code, bg }, i) => (
              <div key={code}
                   className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white/10 ${bg} flex items-center justify-center font-sans text-[9px] md:text-[10px] font-black text-white ${i > 0 ? "-ml-2" : ""}`}>
                {code}
              </div>
            ))}
          </div>
          <div className="font-sans text-xs text-white/40 leading-snug">
            {t.socialProof}<br />
            <span className="text-[10px] md:text-[11px] text-white/20">{t.socialProofEs}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
