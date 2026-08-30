import Link from "next/link";
import {
  MessageCircle,
  QrCode,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "Gerador de Link WhatsApp",
      slug: "/gerador-link-whatsapp",
      description:
        "Crie links personalizados do WhatsApp com número e mensagem pré-definida em poucos segundos.",
      icon: MessageCircle,
      badge: "Disponível",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      active: true,
    },
    {
      title: "Gerador de QR Code",
      slug: "#",
      description:
        "Gere QR Codes de alta resolução para links, WhatsApp, Wi-Fi, textos e cartões de visita virtuais.",
      icon: QrCode,
      badge: "Em Breve",
      badgeColor: "bg-slate-100 text-slate-600 border-slate-200",
      active: false,
    },
    {
      title: "Contador de Palavras & Caracteres",
      slug: "#",
      description:
        "Analise contagem de caracteres, palavras, parágrafos e tempo estimado de leitura de qualquer texto.",
      icon: FileText,
      badge: "Em Breve",
      badgeColor: "bg-slate-100 text-slate-600 border-slate-200",
      active: false,
    },
    {
      title: "Gerador de Meta Tags SEO",
      slug: "#",
      description:
        "Construa e pré-visualize títulos, descrições e OpenGraph tags para o Google, Facebook e Twitter.",
      icon: Search,
      badge: "Em Breve",
      badgeColor: "bg-slate-100 text-slate-600 border-slate-200",
      active: false,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            Utilitários Gratuitos & Sem Cadastro
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Ferramentas Práticas para <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              SEO, Vendas e Marketing
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Aumente suas conversões e otimize seu fluxo de trabalho com nossas ferramentas online rápidas,
            leves e 100% gratuitas.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/gerador-link-whatsapp"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
            >
              Usar Gerador de WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="todas-ferramentas" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Nossas Ferramentas
          </h2>
          <p className="mt-2 text-slate-600">
            Escolha uma das soluções abaixo para começar agora mesmo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const CardWrapper = tool.active ? Link : "div";

            return (
              <CardWrapper
                key={tool.title}
                href={tool.slug}
                className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition ${
                  tool.active
                    ? "border-emerald-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300 cursor-pointer"
                    : "border-slate-200 opacity-80 cursor-default"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        tool.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tool.badgeColor}`}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{tool.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  {tool.active ? (
                    <>
                      Acessar Ferramenta <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <span className="text-slate-400 font-normal">Em desenvolvimento</span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Rápido e Direto</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Sem burocracia ou formulários complexos. Preencha e obtenha seus links e códigos instantaneamente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Privacidade Garantida</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Nenhum dado sensível ou número de telefone digitado é armazenado em nossos servidores.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">100% Gratuito</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Todas as ferramentas são de livre acesso para você usar quantas vezes precisar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
