import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SITE_URL,
  SITE_NAME,
  COMPANY_NAME,
  COMPANY_URL,
  COMPANY_TAGLINE,
} from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Utilitários Online Gratuitos`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Suíte completa de ferramentas gratuitas para SEO, marketing digital e produtividade online por Ventoflow. Gere links de WhatsApp, QR Codes, paletas de cores e muito mais.",
  keywords: [
    "ventoflow",
    "ferramentas seo",
    "gerador link whatsapp",
    "gerador whatsapp",
    "gerador de qr code",
    "gerador de paleta de cores",
    "link direto whatsapp",
    "marketing digital",
    "seo utilitarios",
  ],
  authors: [{ name: COMPANY_NAME, url: COMPANY_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Utilitários Online Gratuitos`,
    description:
      "Suíte de ferramentas gratuitas para SEO, marketing digital e produtividade online por Ventoflow.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "HDanGOFSFxEJP0prsGdVHKSJOQ3O_BkvdXSVWsaFy1M",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  url: COMPANY_URL,
  logo: `${COMPANY_URL}/brand/ventoflow-symbol.png`,
  sameAs: [COMPANY_URL],
  description: COMPANY_TAGLINE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
