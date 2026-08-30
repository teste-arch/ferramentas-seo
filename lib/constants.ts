/**
 * URL base do site centralizada via variável de ambiente.
 * Valor padrão de fallback: "https://ferramentas-seo.vercel.app"
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ferramentas-seo.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Ferramentas SEO";
