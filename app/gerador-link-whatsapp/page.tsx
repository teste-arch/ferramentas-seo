import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  ChevronRight,
  HelpCircle,
  Instagram,
  Store,
  Megaphone,
  Share2,
  QrCode,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import WhatsAppGenerator from "@/components/whatsapp/WhatsAppGenerator";
import { SITE_URL } from "@/lib/constants";

// Força a renderização 100% estática (SSG) para máxima performance e indexação pelos bots de busca
export const dynamic = "force-static";

const PAGE_PATH = "/gerador-link-whatsapp";
const FULL_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Gerador de Link WhatsApp Grátis | Criar Link wa.me com Mensagem",
  description:
    "Gerador de link WhatsApp gratuito e online. Crie links wa.me personalizados com mensagem pré-definida e QR Code em segundos para Instagram Bio, anúncios e vendas.",
  keywords: [
    "gerador de link whatsapp",
    "gerador de link do whatsapp",
    "criar link whatsapp",
    "link whatsapp personalizado",
    "gerar link wa me",
    "link whatsapp mensagem personalizada",
    "gerador de qr code whatsapp",
    "link whatsapp instagram",
    "link direto whatsapp",
  ],
  alternates: {
    canonical: FULL_URL,
  },
  openGraph: {
    title: "Gerador de Link WhatsApp Grátis com Mensagem Personalizada",
    description:
      "Crie seu link do WhatsApp personalizado e QR Code instantâneo. 100% grátis, sem cadastro e direto no navegador.",
    url: FULL_URL,
    siteName: "Ferramentas SEO",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-whatsapp.png`,
        width: 1200,
        height: 630,
        alt: "Gerador de Link WhatsApp - Ferramentas SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Link WhatsApp Grátis | Criar Link wa.me com Mensagem",
    description:
      "Crie links diretos e QR Codes do WhatsApp com mensagens pré-definidas em segundos. 100% gratuito!",
    images: [`${SITE_URL}/og-whatsapp.png`],
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

// Dados estruturados Schema.org para o Google
const jsonLdWebApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gerador de Link WhatsApp",
  url: FULL_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  description:
    "Ferramenta online e gratuita para criar links personalizados do WhatsApp (wa.me) com número e mensagem pré-definida, além de QR Code para download.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  featureList: [
    "Geração de links diretos wa.me em tempo real",
    "Suporte a máscaras de números brasileiros (DDD) e DDI internacional",
    "Mensagem pré-preenchida personalizável",
    "Geração e download de QR Code de alta resolução em PNG",
    "Cópia rápida para área de transferência",
    "Totalmente seguro e client-side, sem armazenamento de dados",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o gerador de link do WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O gerador de link do WhatsApp é uma ferramenta gratuita que permite criar links diretos no formato wa.me com seu número e uma mensagem pré-definida, permitindo que as pessoas iniciem conversas sem precisar salvar seu contato na agenda.",
      },
    },
    {
      "@type": "Question",
      name: "O gerador de link do WhatsApp é gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, a ferramenta é 100% gratuita, sem limites de criação de links ou necessidade de criar conta e login.",
      },
    },
    {
      "@type": "Question",
      name: "O link gerado do WhatsApp expira?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. O link gerado utiliza o padrão oficial do WhatsApp (wa.me) e é permanente, funcionando enquanto a sua conta de WhatsApp e número estiverem ativos.",
      },
    },
    {
      "@type": "Question",
      name: "Como colocar o link do WhatsApp na bio do Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basta gerar o seu link personalizado nesta página, clicar no botão 'Copiar Link', acessar o seu perfil do Instagram, tocar em 'Editar Perfil', selecionar a opção 'Links' / 'Adicionar link externo' e colar a URL gerada.",
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
      name: "Gerador de Link WhatsApp",
      item: FULL_URL,
    },
  ],
};

export default function GeradorLinkWhatsAppPage() {
  return (
    <>
      {/* Scripts de Dados Estruturados JSON-LD */}
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
          <span className="font-medium text-slate-900">Gerador de Link WhatsApp</span>
        </nav>

        {/* Hero Header */}
        <header className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            Ferramenta Online & Gratuita
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Gerador de Link WhatsApp com Mensagem Personalizada
          </h1>
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Crie um link direto do WhatsApp (formato <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-emerald-700 text-sm">wa.me</code>)
            e um QR Code exclusivo com mensagem pré-preenchida. Aumente seus contatos no Instagram,
            campanhas pagas e páginas de vendas.
          </p>
        </header>

        {/* Interactive Generator App (Client-side interactive component) */}
        <section aria-label="Ferramenta Gerador de Link WhatsApp">
          <WhatsAppGenerator />
        </section>

        {/* SEO & Educational Content Section */}
        <article className="space-y-10 border-t border-slate-200 pt-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              O que é e como funciona o Gerador de Link do WhatsApp?
            </h2>
            <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
              <p>
                O <strong>Gerador de Link do WhatsApp</strong> é uma ferramenta online que utiliza a tecnologia
                oficial de <em>Click to Chat</em> (Conversa em um Clique) fornecida pela plataforma do WhatsApp.
                Com esse recurso, qualquer pessoa pode iniciar uma conversa direta com você ou com a sua empresa
                sem a necessidade de adicionar o seu número de telefone à agenda de contatos do smartphone.
              </p>
              <p>
                Além de gerar o link direto no formato seguro <code className="font-mono text-emerald-700 bg-emerald-50 px-1 rounded">https://wa.me/numero</code>,
                nossa ferramenta permite configurar uma <strong>mensagem pré-definida</strong>. Assim que o usuário
                clica no link ou realiza a leitura do QR Code, o aplicativo do WhatsApp é aberto com a mensagem já
                redigida no campo de texto, restando apenas um toque para o envio.
              </p>
              <p>
                Essa estratégia reduz o atrito de contato e melhora drasticamente as taxas de conversão de leads
                no marketing digital. Ao personalizar o texto para cada anúncio ou canal (como por exemplo: <em>&ldquo;Olá! Vi o produto X no Instagram e gostaria de saber o valor&rdquo;</em>),
                você identifica exatamente de onde o potencial cliente veio e agiliza o atendimento comercial.
              </p>
              <p>
                Todo o cálculo do link e a renderização do QR Code ocorrem diretamente no seu navegador
                (100% client-side), garantindo que nenhum número telefônico ou mensagem confidencial seja
                transmitido ou armazenado em servidores externos.
              </p>
            </div>
          </div>

          {/* Where to use cards */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
              Onde utilizar o seu link e QR Code do WhatsApp?
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white mb-4">
                  <Instagram className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Bio do Instagram</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Coloque o link direto na biografia do perfil ou nos stories para transformar seguidores
                  em conversas e vendas imediatas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
                  <Megaphone className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Anúncios Pagos</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Use nos botões de chamada para ação (CTA) em campanhas de Meta Ads, Google Ads e links
                  patrocinados para reduzir o custo por lead.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white mb-4">
                  <Store className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Materiais Impressos & PDV</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Baixe o QR Code em alta resolução e aplique em cartões de visita, banners, cardápios,
                  embalagens e vitrines de lojas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white mb-4">
                  <Share2 className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-900">Sites & E-commerce</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Insira botões flutuantes ou links de suporte nas páginas de produtos e checkout para tirar
                  dúvidas antes do fechamento do pedido.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-step Guide */}
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Guia Prático
              </span>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Como criar seu link do WhatsApp em 3 passos
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-sm text-slate-950">
                    1
                  </div>
                  <h4 className="font-semibold text-white">Selecione o DDI e Telefone</h4>
                  <p className="text-xs text-slate-300">
                    Escolha o país (Brasil é +55) e digite o DDD com o número de celular completo.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-sm text-slate-950">
                    2
                  </div>
                  <h4 className="font-semibold text-white">Defina a Mensagem Inicial</h4>
                  <p className="text-xs text-slate-300">
                    Escreva um texto contextualizado ou use uma de nossas sugestões rápidas de atendimento.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 font-bold text-sm text-slate-950">
                    3
                  </div>
                  <h4 className="font-semibold text-white">Copie o Link ou Baixe o QR Code</h4>
                  <p className="text-xs text-slate-300">
                    Copie o link com 1 clique ou faça o download da imagem PNG do QR Code para divulgar.
                  </p>
                </div>
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
                  Precisa de um QR Code para divulgar o seu link?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Gere um QR Code exclusivo para o seu link do WhatsApp e aplique em cartões de visita,
                  cardápios, balcões, adesivos e banners para facilitar o contato imediato dos seus clientes no mundo físico!
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/gerador-qr-code"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                >
                  <QrCode className="h-4 w-4" />
                  Criar QR Code do Link
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section with Rich Schema Correspondence */}
          <section aria-label="Perguntas Frequentes sobre o Gerador de Link WhatsApp" className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Perguntas Frequentes (FAQ)
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  O que é o gerador de link do WhatsApp?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  O gerador de link do WhatsApp é uma ferramenta gratuita que permite criar links diretos no formato <code className="font-mono text-emerald-700">wa.me</code> com seu número e uma mensagem pré-definida, permitindo que as pessoas iniciem conversas sem precisar salvar seu contato na agenda.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  O gerador de link do WhatsApp é gratuito?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Sim, a ferramenta é 100% gratuita, sem limites de criação de links ou necessidade de criar conta e login.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  O link gerado do WhatsApp expira?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Não. O link gerado utiliza o padrão oficial do WhatsApp (<code className="font-mono text-emerald-700">wa.me</code>) e é permanente, funcionando enquanto a sua conta de WhatsApp e número estiverem ativos.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="font-bold text-slate-900 text-sm">
                  Como colocar o link do WhatsApp na bio do Instagram?
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Basta gerar o seu link personalizado nesta página, clicar no botão &ldquo;Copiar Link&rdquo;, acessar o seu perfil do Instagram, tocar em &ldquo;Editar Perfil&rdquo;, selecionar a opção &ldquo;Links&rdquo; / &ldquo;Adicionar link externo&rdquo; e colar a URL gerada.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
