import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ferramentas SEO | Utilitários Online Gratuitos",
    template: "%s | Ferramentas SEO",
  },
  description:
    "Suíte completa de ferramentas gratuitas para SEO, marketing digital e produtividade online. Gere links de WhatsApp, QR Codes, tags e muito mais.",
  keywords: [
    "ferramentas seo",
    "gerador link whatsapp",
    "gerador whatsapp",
    "link direto whatsapp",
    "marketing digital",
    "seo utilitarios",
  ],
  authors: [{ name: "Ferramentas SEO" }],
  creator: "Ferramentas SEO",
  metadataBase: new URL("https://ferramentasseo.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ferramentasseo.com.br",
    siteName: "Ferramentas SEO",
    title: "Ferramentas SEO | Utilitários Online Gratuitos",
    description:
      "Suíte de ferramentas gratuitas para SEO, marketing digital e produtividade online.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
