import { notFound } from "next/navigation";
import { getTranslations } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArticlePage } from "@/components/tutorials/ArticlePage";
import { getArticle, ARTICLES } from "@/lib/content/articles";
import type { Lang } from "@/lib/i18n";

export function generateStaticParams() {
  const langs = ["en", "es"];
  return langs.flatMap((lang) =>
    ARTICLES.map((article) => ({ lang, slug: article.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) return {};
  const isEs = params.lang === "es";
  return {
    title: `${isEs ? article.titleEs : article.titleEn} | OPCAmerica`,
    description: isEs ? article.excerptEs : article.excerptEn,
  };
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const t = getTranslations(lang);

  return (
    <>
      <Nav lang={lang as Lang} t={t.nav} />
      <main>
        <ArticlePage article={article} lang={lang as Lang} />
      </main>
      <Footer lang={lang as Lang} t={t.footer} />
    </>
  );
}
