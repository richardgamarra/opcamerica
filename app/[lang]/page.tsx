import { getTranslations } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/home/Hero";
import type { Lang } from "@/lib/i18n";

export default async function HomePage({
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
        <Hero lang={lang as Lang} t={t.hero} />
      </main>
    </>
  );
}
