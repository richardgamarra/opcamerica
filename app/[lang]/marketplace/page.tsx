import { getTranslations } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import type { Lang } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const isEs = params.lang === "es";
  return {
    title: isEs
      ? "Marketplace | OPCAmerica"
      : "Marketplace | OPCAmerica",
    description: isEs
      ? "Herramientas, recursos y productos de founders OPC para las Américas."
      : "Tools, resources, and products from OPC founders across the Americas.",
  };
}

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang);
  const isEs = lang === "es";

  return (
    <>
      <Nav lang={lang as Lang} t={t.nav} />
      <main className="min-h-screen bg-opc-light dark:bg-opc-dark">
        <section className="pt-28 pb-20 px-5 md:px-6 flex flex-col items-center justify-center text-center">
          <p className="font-sans text-[11px] font-bold text-opc-orange uppercase tracking-widest mb-4">
            {isEs ? "Marketplace" : "Marketplace"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-opc-dark dark:text-white mb-6 max-w-2xl leading-tight">
            {isEs ? "El Marketplace OPC de las Américas" : "The OPC Marketplace of the Americas"}
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-500 dark:text-white/50 max-w-xl mb-10">
            {isEs
              ? "Productos, herramientas y servicios creados por founders OPC. Próximamente."
              : "Products, tools, and services built by OPC founders. Coming soon."}
          </p>
          <div className="inline-flex items-center gap-2 bg-opc-orange/10 border border-opc-orange/20 text-opc-orange font-sans text-sm font-semibold px-5 py-2.5 rounded-full">
            {isEs ? "Próximamente" : "Coming Soon"}
          </div>
        </section>
      </main>
      <Footer lang={lang as Lang} t={t.footer} />
    </>
  );
}
