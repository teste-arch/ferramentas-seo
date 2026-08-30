import { MetadataRoute } from "next";

const BASE_URL = "https://ferramentasseo.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Lista centralizada de rotas para fácil expansão com novas ferramentas SEO
  const routes = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/gerador-link-whatsapp`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    // Futuras ferramentas podem ser adicionadas aqui:
    // {
    //   url: `${BASE_URL}/gerador-qr-code`,
    //   lastModified: currentDate,
    //   changeFrequency: "weekly" as const,
    //   priority: 0.8,
    // },
  ];

  return routes;
}
