import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { VentoSymbol } from "@/components/vento-symbol";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 group">
              <VentoSymbol size={38} color="#059669" className="transition-transform group-hover:scale-105" />
              <span className="text-xl font-extrabold tracking-tight">
                Vento<span className="text-emerald-600">flow</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Conjunto de ferramentas online gratuitas pensadas para profissionais de marketing,
              SEO, vendas e empreendedores que buscam agilidade e produtividade no dia a dia.
            </p>
            <div className="text-xs text-slate-400">
              Sem necessidade de login ou cartão de crédito.
            </div>
          </div>

          {/* Tools Col */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Ferramentas
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/gerador-link-whatsapp"
                  className="text-slate-600 transition hover:text-emerald-600"
                >
                  Gerador de Link WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="/gerador-qr-code"
                  className="text-slate-600 transition hover:text-emerald-600"
                >
                  Gerador de QR Code
                </Link>
              </li>
              <li>
                <Link
                  href="/gerador-paleta-de-cores"
                  className="text-slate-600 transition hover:text-emerald-600"
                >
                  Gerador de Paleta de Cores
                </Link>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1.5">
                  Contador de Caracteres
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
                    Em breve
                  </span>
                </span>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1.5">
                  Gerador de Meta Tags
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
                    Em breve
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Useful Links Col */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Links Úteis
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-600 transition hover:text-emerald-600">
                  Início
                </Link>
              </li>
              <li>
                <a
                  href="#politica-privacidade"
                  className="text-slate-600 transition hover:text-emerald-600"
                >
                  Privacidade & Segurança
                </a>
              </li>
              <li>
                <a
                  href="#termos-uso"
                  className="text-slate-600 transition hover:text-emerald-600"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-slate-600 transition hover:text-emerald-600"
                >
                  Fale Conosco
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Ventoflow. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            Feito com <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> para impulsionar seus resultados.
          </p>
        </div>
      </div>
    </footer>
  );
}
