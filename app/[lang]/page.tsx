import { getTranslations } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { WhatIsOPC } from "@/components/home/WhatIsOPC";
import { Pillars } from "@/components/home/Pillars";
import { Tutorials } from "@/components/home/Tutorials";
import { AITools } from "@/components/home/AITools";
import { LaunchPad } from "@/components/home/LaunchPad";
import { Testimonials } from "@/components/home/Testimonials";
import { EmailCapture } from "@/components/home/EmailCapture";
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
        <WhatIsOPC t={t.whatIsOpc} />
        <Pillars lang={lang as Lang} t={t.pillars} />
        <Tutorials lang={lang as Lang} t={t.tutorials} />
        <AITools lang={lang as Lang} t={t.aiTools} />
        <LaunchPad lang={lang as Lang} t={t.launchpad} />
        <Testimonials t={t.testimonials} />
        <EmailCapture t={t.emailCapture} />
      </main>
      <Footer lang={lang as Lang} t={t.footer} />
    </>
  );
}
