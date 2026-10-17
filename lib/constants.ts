/**
 * URL base do site centralizada via variável de ambiente.
 * Valor padrão de fallback: "https://ferramentas-seo.vercel.app"
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ferramentas-seo.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Ventoflow";
export const COMPANY_NAME = "Ventoflow";
export const COMPANY_URL = "https://ventoflow.top";
export const COMPANY_TAGLINE = "Hub de Engenharia e Automação de Missão Crítica";
