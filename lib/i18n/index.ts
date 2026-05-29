import { en } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";

export function getTranslations(lang: string) {
  return lang === "es" ? es : en;
}

export { en, es };
export type { Translations } from "./en";
