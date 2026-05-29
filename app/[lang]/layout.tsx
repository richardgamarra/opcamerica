import { notFound } from "next/navigation";

const VALID_LANGS = ["en", "es"];

export async function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!VALID_LANGS.includes(lang)) notFound();

  return (
    <>
      <link rel="alternate" hrefLang="en" href="https://opcamerica.com/en/" />
      <link rel="alternate" hrefLang="es" href="https://opcamerica.com/es/" />
      <link rel="alternate" hrefLang="x-default" href="https://opcamerica.com/en/" />
      {children}
    </>
  );
}
