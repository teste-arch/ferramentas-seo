import type { Metadata } from "next";
import Link from "next/link";
import {
  QrCode,
  ChevronRight,
  HelpCircle,
  Utensils,
  Contact,
  Wifi,
  Share2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import QRCodeGenerator from "@/components/qrcode/QRCodeGenerator";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

const PAGE_PATH = "/gerador-qr-code";
const FULL_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Gerador de QR Code Grátis | Criar QR Code Online em PNG e SVG",
  description:
    "Crie QR Codes personalizados gratuitamente em alta resolução. Gere códigos para links, textos, Wi-Fi e WhatsApp com download instantâneo em PNG e SVG sem cadastro.",
  keywords: [
    "gerador de qr code",
    "criar qr code gratis",
    "gerador qr code online",
    "qr code png alta resolucao",
    "qr code svg vetor",
    "gerar qr code whatsapp",
    "gerador de qr code personalizado",
    "qr code cardapio digital",
    "qr code wifi",
  ],
  alternates: {
    canonical: FULL_URL,
  },
  openGraph: {
    title: "Gerador de QR Code Grátis | Criar QR Code Online em PNG e SVG",
    description:
      "Gerador de QR Code online e gratuito. Personalize cores, escolha o nível de correção de erro e baixe em PNG de alta resolução ou vetor SVG.",
    url: FULL_URL,
    siteName: "Ferramentas SEO",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-qrcode.png`,
        width: 1200,
        height: 630,
        alt: "Gerador de QR Code Grátis - Ferramentas SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de QR Code Grátis | Criar QR Code Online em PNG e SVG",
    description:
      "Crie QR Codes em alta resolução gratuitamente. Baixe em PNG ou vetor SVG sem cadastro!",
    images: [`${SITE_URL}/og-qrcode.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Dados estruturados Schema.org
const jsonLdWebApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de QR Code Online",
  url: FULL_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  description:
    "Ferramenta online gratuita para criar e customizar QR Codes em tempo real com exportação em PNG de alta resolução e SVG vetorial.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Geração de QR Code em tempo real",
    "Personalização de cor do código e fundo",
    "Ajuste do nível de correção de erro (L, M, Q, H)",
    "Download em PNG de alta resolução (até 2000x2000 px)",
    "Download em vetor SVG para uso gráfico e impressão",
    "100% gratuito e seguro, executado no cliente",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é um QR Code e como ele funciona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QR Code (Quick Response Code) é um código de barras bidimensional que armazena informações como links, textos, números ou redes Wi-Fi, podendo ser lido instantaneamente pela câmera de smartphones.",
      },
    },
    {
      "@type": "Question",
      name: "O QR Code gerado possui prazo de validade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Os QR Codes gerados nesta ferramenta são estáticos e permanentes. Eles nunca expiram e funcionarão enquanto o destino (como o link ou site) permanecer ativo.",
      },
    },
    {
      "@type": "Question",
      name: "Posso usar o QR Code em materiais impressos como cardápios e banners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim! Disponibilizamos o download em PNG de alta definição (até 2000x2000 px) e em formato vetorial SVG, ideal para designers e gráficas garantirem nitidez perfeita em qualquer escala de impressão.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é a melhor combinação de cores para o QR Code funcionar bem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A recomendação ideal é sempre manter alto contraste: o código em cor escura (como preto, azul escuro ou verde) e o fundo em cor clara (preferencialmente branco). Evite fundos escuros com códigos claros.",
      },
    },
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gerador de QR Code",
      item: FULL_URL,
    },
  ],
};

export default function GeradorQRCodePage() {
  return (
    <>
      {/* Schemas JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-emerald-600">
            Início
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="font-medium text-slate-900">Gerador de QR Code</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
            <QrCode className="h-4 w-4 text-emerald-600" />
            Ferramenta Online & Gratuita
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Gerador de QR Code Grátis com Download em PNG e SVG
          </h1>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Crie QR Codes personalizados instantaneamente para qualquer link, texto, WhatsApp ou Wi-Fi.
            Ajuste cores, escolha o nível de correção de erro e baixe em alta resolução para uso digital ou impressão.
          </p>
        </header>

        {/* Interactive QR Generator */}
        <section aria-label="Ferramenta Gerador de QR Code">
          <QRCodeGenerator />
        </section>

        {/* SEO Explanatory Content */}
        <article className="space-y-10 border-t border-slate-200 pt-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              O que é um QR Code e como ele pode impulsionar seu negócio?
            </h2>
            <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
              <p>
                O <strong>QR Code (Quick Response Code)</strong> é um código de barras bidimensional desenvolvido
                para ser lido rapidamente por qualquer câmera de smartphone moderna. Ao contrário dos códigos
                lineares tradicionais, o QR Code consegue armazenar centenas de vezes mais dados, como links de
                sites, informações de contato, chaves de pagamento Pix ou credenciais de rede Wi-Fi.
              </p>
              <p>
                Nossa ferramenta oferece um gerador <strong>estático e permanente</strong>. Isso significa que
                o código criado não depende de intermediários ou redirecionamentos de terceiros que podem parar
                de funcionar após um período de teste. O conteúdo codificado fica gravado diretamente no desenho
                geométrico do QR Code, garantindo funcionamento vitalício e confiabilidade para suas campanhas.
              </p>
              <p>
                Você pode personalizar a identidade visual do seu QR Code alterando as cores da frente e do fundo,
                além de configurar o <strong>nível de correção de erro (Error Correction)</strong>. Com níveis mais
                altos como o <em>Quartil (Q)</em> ou <em>Alto (H)</em>, o código mantém sua legibilidade mesmo que
                partes da impressão sofram pequenos desgastes físicos ou recebam a sobreposição de elementos gráficos.
              </p>
              <p>
                O download está disponível em formato <strong>PNG de alta definição</strong> (com resoluções de até
                2000x2000 pixels) e em <strong>SVG vetorial</strong>, permitindo que designers gráficos e gráficas
                ampliem o código em banners gigantes ou materiais de PDV sem nenhuma perda de qualidade ou serrilhamento.
              </p>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
              Principais Casos de Uso para QR Codes
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white mb-4">
                  <Utensils className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Cardápios Digitais</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Coloque nas mesas de bares e restaurantes para que os clientes visualizem o cardápio no
                  celular sem filas ou impressões diárias.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
                  <Contact className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Cartões de Visita</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Imprima seu QR Code no verso do cartão profissional para direcionar o contato para o seu
                  LinkedIn, portfólio ou WhatsApp.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white mb-4">
                  <Wifi className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Conexão Wi-Fi Rápida</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Facilite o acesso dos clientes à rede do seu estabelecimento: basta escanear para conectar
                  sem precisar soletrar senhas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white mb-4">
                  <Share2 className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Redes Sociais & Vendas</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Direcione consumidores em vitrines, embalagens de produtos e panfletos direto para o seu
                  Instagram, catálogo ou checkout.
                </p>
              </div>
            </div>
          </div>

          {/* RELATED TOOLS PROMO SECTION (Combo WhatsApp + QR Code) */}
          <section className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  Combo Recomendado de Conversão
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Quer um QR Code direto para o seu WhatsApp?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Aproveite nossa ferramenta parceira para gerar um link personalizado do WhatsApp com número
                  e mensagem inicial pré-configurada. Em seguida, gere o QR Code dele para colocar em seus
                  adesivos, cardápios e materiais de balcão!
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/gerador-link-whatsapp"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ir para o Gerador de WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-label="Perguntas Frequentes sobre o Gerador de QR Code" className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Perguntas Frequentes (FAQ)
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  O que é um QR Code e como ele funciona?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  QR Code (Quick Response Code) é um código de barras bidimensional que armazena informações como links, textos, números ou redes Wi-Fi, podendo ser lido instantaneamente pela câmera de smartphones.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  O QR Code gerado possui prazo de validade?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Não. Os QR Codes gerados nesta ferramenta são estáticos e permanentes. Eles nunca expiram e funcionarão enquanto o destino (como o link ou site) permanecer ativo.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Posso usar o QR Code em materiais impressos como cardápios e banners?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Sim! Disponibilizamos o download em PNG de alta definição (até 2000x2000 px) e em formato vetorial SVG, ideal para designers e gráficas garantirem nitidez perfeita em qualquer escala de impressão.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Qual é a melhor combinação de cores para o QR Code funcionar bem?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  A recomendação ideal é sempre manter alto contraste: o código em cor escura (como preto, azul escuro ou verde) e o fundo em cor clara (preferencialmente branco). Evite fundos escuros com códigos claros.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
