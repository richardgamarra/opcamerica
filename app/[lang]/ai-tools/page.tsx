import { getTranslations } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AIToolsPage } from "@/components/ai-tools/AIToolsPage";
import type { Lang } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const isEs = params.lang === "es";
  return {
    title: isEs
      ? "El AI Toolkit del Emprendedor OPC | OPCAmerica"
      : "The One Person Company Entrepreneur AI Toolkit | OPCAmerica",
    description: isEs
      ? "55+ herramientas de IA curadas para fundadores OPC. Deals exclusivos para miembros y el Recommended Core Stack."
      : "55+ curated AI tools for OPC founders. Exclusive member deals and the Recommended Core Stack.",
  };
}

export default async function AIToolsRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <>
      <Nav lang={lang as Lang} t={t.nav} />
      <main>
        <AIToolsPage lang={lang as Lang} t={t.aiTools} />
      </main>
      <Footer lang={lang as Lang} t={t.footer} />
    </>
  );
}
