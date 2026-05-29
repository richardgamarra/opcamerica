import type { Translations } from "@/lib/i18n";

const TESTIMONIALS = [
  {
    quote: "OPCAmerica me dio las herramientas y la comunidad para lanzar mi consulting OPC en 90 días. La sección en español hace toda la diferencia.",
    name: "Diego R.",
    role: "Founder, OPC Consulting MX",
    flag: "🇲🇽",
    country: "Monterrey, Mexico",
  },
  {
    quote: "Finally a platform that speaks to Americas-based solo founders. The LaunchPad alone paid for my membership 10x over.",
    name: "Jessica T.",
    role: "Founder, Solo Scale Studio",
    flag: "🇺🇸",
    country: "Austin, USA",
  },
  {
    quote: "Como founder en Colombia, siempre encontré barreras de idioma y precio en plataformas gringas. OPCAmerica es diferente — es para nosotros.",
    name: "Andrés M.",
    role: "Founder, Latam AI Tools",
    flag: "🇨🇴",
    country: "Bogotá, Colombia",
  },
];

interface Props {
  t: Translations["testimonials"];
}

export function Testimonials({ t }: Props) {
  return (
    <section className="bg-white dark:bg-opc-dark py-16 md:py-24 px-5 md:px-6 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-opc-dark dark:text-white text-center mb-10 md:mb-14 tracking-tight">
          {t.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map(({ quote, name, role, flag, country }) => (
            <div key={name} className="bg-gray-50 border border-gray-200 dark:bg-white/5 dark:border-white/8 rounded-xl p-6 md:p-7">
              <p className="font-sans text-gray-600 dark:text-white/70 leading-relaxed mb-5 md:mb-6 text-sm italic">&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl">{flag}</span>
                <div>
                  <div className="font-sans font-bold text-opc-dark dark:text-white text-sm">{name}</div>
                  <div className="font-sans text-xs text-gray-400 dark:text-white/40">{role}</div>
                  <div className="font-sans text-xs text-gray-300 dark:text-white/25">{country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
