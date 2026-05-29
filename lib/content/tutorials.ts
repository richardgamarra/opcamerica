export type TutorialLang = "en" | "es" | "both";

export interface Tutorial {
  slug: string;
  titleEn: string;
  titleEs: string;
  category: string;
  categoryEs: string;
  readTime: number;
  lang: TutorialLang;
}

export const TUTORIALS: Tutorial[] = [
  { slug: "what-is-opc", titleEn: "What is a One Person Company?", titleEs: "¿Qué es una One Person Company?", category: "Getting Started", categoryEs: "Primeros Pasos", readTime: 8, lang: "both" },
  { slug: "ai-tools-for-founders", titleEn: "Top 10 AI Tools for OPC Founders", titleEs: "Top 10 Herramientas IA para Founders OPC", category: "AI Tools", categoryEs: "Herramientas IA", readTime: 12, lang: "both" },
  { slug: "launch-in-30-days", titleEn: "Launch Your OPC in 30 Days", titleEs: "Lanza tu OPC en 30 Días", category: "Getting Started", categoryEs: "Primeros Pasos", readTime: 15, lang: "both" },
  { slug: "pricing-for-opc", titleEn: "Pricing Strategy for Solo Founders", titleEs: "Estrategia de Precios para Founders", category: "Business", categoryEs: "Negocio", readTime: 10, lang: "en" },
  { slug: "ai-content-marketing", titleEn: "AI-Powered Content Marketing", titleEs: "Marketing de Contenido con IA", category: "Marketing", categoryEs: "Marketing", readTime: 11, lang: "en" },
  { slug: "success-story-mexico", titleEn: "How Diego Built a $10K/mo OPC from Monterrey", titleEs: "Cómo Diego construyó un OPC de $10K/mes desde Monterrey", category: "Success Stories", categoryEs: "Casos de Éxito", readTime: 6, lang: "both" },
];
