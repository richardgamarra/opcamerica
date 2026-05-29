import { getTranslations } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { TutorialsPage } from "@/components/tutorials/TutorialsPage";
import type { Lang } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const isEs = params.lang === "es";
  return {
    title: isEs
      ? "Tutoriales para Fundadores OPC | OPCAmerica"
      : "Tutorials for OPC Founders | OPCAmerica",
    description: isEs
      ? "Guías paso a paso para fundar, lanzar y escalar tu One Person Company en las Américas."
      : "Step-by-step guides for founding, launching, and scaling your One Person Company across the Americas.",
  };
}

export default async function TutorialsRoute({
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
        <TutorialsPage lang={lang as Lang} t={t.tutorials} />
      </main>
      <Footer lang={lang as Lang} t={t.footer} />
    </>
  );
}
