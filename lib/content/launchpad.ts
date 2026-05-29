export interface LaunchPadDeal {
  id: string;
  founderName: string;
  founderCountry: string;
  flag: string;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  discount: string;
  claimsLeft: number;
  totalClaims: number;
  votes: number;
}

export const LAUNCHPAD_FEATURED: LaunchPadDeal[] = [
  {
    id: "opc-playbook",
    founderName: "Carlos R.",
    founderCountry: "Mexico",
    flag: "🇲🇽",
    titleEn: "OPC Founder Playbook",
    titleEs: "Manual del Founder OPC",
    descEn: "The complete guide to launching and scaling a One Person Company in Latin America.",
    descEs: "La guía completa para lanzar y escalar una One Person Company en América Latina.",
    discount: "40% OFF",
    claimsLeft: 23,
    totalClaims: 50,
    votes: 187,
  },
  {
    id: "ai-content-pack",
    founderName: "Sarah M.",
    founderCountry: "USA",
    flag: "🇺🇸",
    titleEn: "AI Content Pack for Solo Founders",
    titleEs: "Pack de Contenido IA para Founders",
    descEn: "500 AI prompts and templates for founders — social, email, sales, and more.",
    descEs: "500 prompts y plantillas IA para founders — redes, email, ventas y más.",
    discount: "FREE",
    claimsLeft: 8,
    totalClaims: 100,
    votes: 342,
  },
  {
    id: "latam-legal-kit",
    founderName: "Andrés V.",
    founderCountry: "Colombia",
    flag: "🇨🇴",
    titleEn: "LatAm OPC Legal Starter Kit",
    titleEs: "Kit Legal para OPC en Latinoamérica",
    descEn: "Legal document templates for registering and operating an OPC across 5 countries.",
    descEs: "Plantillas legales para registrar y operar una OPC en 5 países de Latinoamérica.",
    discount: "30% OFF",
    claimsLeft: 41,
    totalClaims: 75,
    votes: 129,
  },
];
