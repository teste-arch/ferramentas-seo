import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  ChevronRight,
  HelpCircle,
  Layout,
  Sparkles,
  Presentation,
  Share2,
  MessageCircle,
  QrCode,
  ArrowRight,
} from "lucide-react";
import ColorPaletteGenerator from "@/components/palette/ColorPaletteGenerator";
import { SITE_URL, SITE_NAME, COMPANY_NAME, COMPANY_URL } from "@/lib/constants";

export const dynamic = "force-static";

const PAGE_PATH = "/gerador-paleta-de-cores";
const FULL_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Gerador de Paleta de Cores Grátis | Criar Paletas Harmônicas Online",
  description:
    "Gerador de paleta de cores online e gratuito. Crie combinações de 5 cores harmônicas para design de sites, branding e apresentações. Exporte em CSS e PNG sem cadastro.",
  keywords: [
    "gerador de paleta de cores",
    "criar paleta de cores",
    "paleta de cores online",
    "gerador de cores",
    "combinacao de cores",
    "paleta de cores para site",
    "cores complementares",
    "paleta de cores hex",
  ],
  alternates: {
    canonical: FULL_URL,
  },
  openGraph: {
    title: "Gerador de Paleta de Cores Grátis | Criar Paletas Harmônicas Online",
    description:
      "Gere paletas de 5 cores harmônicas com um clique. Trave cores favoritas, copie códigos HEX/RGB/HSL e exporte em PNG e CSS gratuitamente.",
    url: FULL_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-palette.png`,
        width: 1200,
        height: 630,
        alt: `Gerador de Paleta de Cores - ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Paleta de Cores Grátis | Criar Paletas Harmônicas Online",
    description:
      "Crie combinações perfeitas de cores para seus projetos digitais. Exporte em CSS e imagem PNG sem cadastro.",
    images: [`${SITE_URL}/og-palette.png`],
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

// JSON-LD Dados Estruturados Schema.org
const jsonLdWebApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de Paleta de Cores Online",
  url: FULL_URL,
  applicationCategory: "DesignApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  description:
    "Ferramenta online gratuita para geração de paletas de cores harmônicas com travas individuais, visualização HEX/RGB/HSL e exportação em imagem PNG e código CSS.",
  author: {
    "@type": "Organization",
    name: COMPANY_NAME,
    url: COMPANY_URL,
  },
  provider: {
    "@type": "Organization",
    name: COMPANY_NAME,
    url: COMPANY_URL,
  },
  creator: {
    "@type": "Organization",
    name: COMPANY_NAME,
    url: COMPANY_URL,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Geração de 5 cores harmônicas em tempo real",
    "Trava de cores individuais para manter combinações fixas",
    "Cópia instantânea dos códigos nos formatos HEX, RGB e HSL",
    "Edição manual com seletor de cor integrado",
    "Exportação da paleta em imagem PNG em alta resolução",
    "Exportação das cores como variáveis CSS (:root)",
    "100% gratuito, seguro e executado no navegador",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como funciona o gerador de paleta de cores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ferramenta utiliza algoritmos de harmonia cromática (cores análogas, complementares, triádicas e variações de contraste) para criar automaticamente combinações de 5 cores visualmente equilibradas e modernas.",
      },
    },
    {
      "@type": "Question",
      name: "Posso manter uma cor específica e gerar variações das outras?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim! Basta clicar no ícone de cadeado (Lock) em qualquer uma das cores para travá-la. Ao clicar em 'Gerar Nova Paleta' ou apertar Espaço, as cores travadas permanecem fixas enquanto as demais são atualizadas.",
      },
    },
    {
      "@type": "Question",
      name: "Como exportar as cores para usar no meu site ou Figma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Você pode copiar os códigos individuais em HEX, RGB ou HSL, clicar em 'Exportar CSS' para obter o bloco de variáveis :root pronto para a sua folha de estilos, ou clicar em 'Baixar Imagem PNG' para salvar um arquivo visual da paleta.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é a importância de escolher uma boa paleta de cores para um projeto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uma paleta harmônica melhora a identidade visual, facilita a legibilidade, orienta o usuário através da hierarquia visual (botões de ação, textos e fundos) e transmite profissionalismo e confiança para a sua marca.",
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
      name: "Gerador de Paleta de Cores",
      item: FULL_URL,
    },
  ],
};

export default function GeradorPaletaDeCoresPage() {
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
          <span className="font-medium text-slate-900">Gerador de Paleta de Cores</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
            <Palette className="h-4 w-4 text-emerald-600" />
            Ferramenta Online & Gratuita
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Gerador de Paleta de Cores Harmônicas
          </h1>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Crie combinações perfeitas de cores para seus sites, logotipos, posts e apresentações.
            Trave suas cores preferidas, copie em HEX, RGB ou HSL e exporte em PNG ou variáveis CSS.
          </p>
        </header>

        {/* Interactive Color Palette Tool */}
        <section aria-label="Ferramenta Gerador de Paleta de Cores">
          <ColorPaletteGenerator />
        </section>

        {/* SEO Explanatory Content */}
        <article className="space-y-10 border-t border-slate-200 pt-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              O que é Harmonia de Cores e como ela transforma seu design?
            </h2>
            <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
              <p>
                A <strong>harmonia de cores</strong> é a relação equilibrada e visualmente atraente entre
                diferentes tonalidades no círculo cromático. Na teoria do design e no marketing digital,
                a escolha correta das cores não é apenas uma questão estética: ela dita a legibilidade,
                a facilidade de navegação e as emoções que uma marca transmite aos seus visitantes.
              </p>
              <p>
                Nosso gerador calcula automaticamente relações cromáticas clássicas, como <em>cores análogas</em>
                (tons vizinhos que transmitem calma e consistência), <em>cores complementares</em> (tons opostos
                que geram alto impacto visual para botões de CTA e conversão) e <em>paletas triádicas</em> (três
                cores equidistantes que proporcionam vitalidade e dinamismo).
              </p>
              <p>
                Com a funcionalidade de <strong>trava individual de cores (Lock)</strong>, você pode partir
                da cor principal da sua marca e deixar que o algoritmo encontre as cores de apoio, fundos e
                destaques ideais. Todos os códigos são calculados com precisão nos padrões <strong>HEX</strong>,
                <strong>RGB</strong> e <strong>HSL</strong> para integração imediata no Figma, Photoshop, Canva
                ou diretamente no código-fonte do seu projeto.
              </p>
              <p>
                A exportação em <strong>variáveis CSS (:root)</strong> simplifica o trabalho de desenvolvedores
                front-end, enquanto o download em <strong>imagem PNG de alta resolução</strong> permite criar
                guias de estilo rápidos para compartilhar com clientes e equipes criativas.
              </p>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
              Onde aplicar suas Paletas de Cores?
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
                  <Layout className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Web Design & UI/UX</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Defina a cor primária, secundária, fundos e botões de chamada para ação (CTA) em landing
                  pages e aplicativos.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Branding & Logotipos</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Construa a identidade visual completa da sua marca com paletas memoráveis e consistentes.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white mb-4">
                  <Presentation className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Apresentações de Slides</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Destaque títulos, gráficos e informações estratégicas em slides do PowerPoint, Google Slides e pitch decks.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-white mb-4">
                  <Share2 className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Redes Sociais & Canva</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Mantenha um feed do Instagram profissional e alinhado aplicando a mesma paleta em todos os posts.
                </p>
              </div>
            </div>
          </div>

          {/* RELATED TOOLS PROMO SECTION */}
          <section className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white p-8 sm:p-10 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  Ferramentas Relacionadas
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Potencialize seu Marketing com Outras Ferramentas Gratuitas
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Combine sua nova identidade visual com nossas ferramentas de engajamento e conversão de clientes.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  href="/gerador-link-whatsapp"
                  className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition">
                        Gerador de Link WhatsApp
                      </h4>
                      <p className="text-xs text-slate-500">
                        Crie links wa.me personalizados com mensagem pré-definida.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
                </Link>

                <Link
                  href="/gerador-qr-code"
                  className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition">
                        Gerador de QR Code
                      </h4>
                      <p className="text-xs text-slate-500">
                        Gere QR Codes de alta resolução com download em PNG e SVG.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-label="Perguntas Frequentes sobre o Gerador de Paleta de Cores" className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Perguntas Frequentes (FAQ)
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Como funciona o gerador de paleta de cores?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  A ferramenta utiliza algoritmos de harmonia cromática (cores análogas, complementares, triádicas e variações de contraste) para criar automaticamente combinações de 5 cores visualmente equilibradas e modernas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Posso manter uma cor específica e gerar variações das outras?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Sim! Basta clicar no ícone de cadeado (Lock) em qualquer uma das cores para travá-la. Ao clicar em &ldquo;Gerar Nova Paleta&rdquo; ou apertar Espaço, as cores travadas permanecem fixas enquanto as demais são atualizadas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Como exportar as cores para usar no meu site ou Figma?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Você pode copiar os códigos individuais em HEX, RGB ou HSL, clicar em &ldquo;Exportar CSS&rdquo; para obter o bloco de variáveis :root pronto para a sua folha de estilos, ou clicar em &ldquo;Baixar Imagem PNG&rdquo; para salvar um arquivo visual da paleta.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Qual é a importância de escolher uma boa paleta de cores?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Uma paleta harmônica melhora a identidade visual, facilita a legibilidade, orienta o usuário através da hierarquia visual (botões de ação, textos e fundos) e transmite profissionalismo e confiança para a sua marca.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
