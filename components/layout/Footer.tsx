import Link from "next/link";
import type { Translations } from "@/lib/i18n";

type Lang = "en" | "es";

interface Props {
  lang: Lang;
  t: Translations["footer"];
}

const SLUGS = ["launchpad", "community", "ai-tools", "consulting", "tutorials", "about", "privacy", "terms"];

export function Footer({ lang, t }: Props) {
  const otherLang = lang === "en" ? "es" : "en";

  return (
    <footer className="bg-white dark:bg-opc-dark border-t border-gray-200 dark:border-white/8 py-10 md:py-12 px-5 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-sans font-black text-xl text-opc-dark dark:text-white mb-2">
            OPC<span className="text-opc-orange">America</span>
          </div>
          <p className="font-sans text-sm text-gray-400 dark:text-white/30">{t.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8">
          {t.links.map((label, i) => (
            <Link key={label} href={`/${lang}/${SLUGS[i]}`}
                  className="font-sans text-sm text-gray-400 dark:text-white/40 hover:text-opc-orange dark:hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <Link href={`/${otherLang}/`}
                className="font-sans text-xs border border-gray-200 dark:border-white/15 px-4 py-1.5 rounded-full text-gray-400 dark:text-white/50 hover:text-opc-dark dark:hover:text-white transition-colors">
            🌐 {otherLang === "en" ? "English" : "Español"}
          </Link>
          <p className="font-sans text-xs text-gray-300 dark:text-white/25">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
