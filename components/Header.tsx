import React from "react";
import Link from "next/link";
import { MessageCircle, QrCode, Palette, Layers, ExternalLink } from "lucide-react";
import { VentoSymbol } from "@/components/vento-symbol";
import { COMPANY_URL } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-slate-900 transition hover:opacity-90 group"
        >
          <div className="flex items-center justify-center">
            <VentoSymbol size={44} color="#059669" className="transition-transform group-hover:scale-105" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Vento<span className="text-emerald-600">flow</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 -mt-0.5">
              Ferramentas Online & Grátis
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            Início
          </Link>
          <Link
            href="/gerador-link-whatsapp"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            Gerador WhatsApp
          </Link>
          <Link
            href="/gerador-qr-code"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <QrCode className="h-4 w-4 text-emerald-600" />
            Gerador QR Code
          </Link>
          <Link
            href="/gerador-paleta-de-cores"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <Palette className="h-4 w-4 text-emerald-600" />
            Paleta de Cores
          </Link>
          <Link
            href="/#todas-ferramentas"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            <Layers className="h-4 w-4 text-slate-400" />
            Todas as Ferramentas
          </Link>
        </nav>

        {/* Action / Badge */}
        <div className="flex items-center gap-3">
          <a
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 transition hover:bg-emerald-100 hover:border-emerald-300"
            title="Conheça a Ventoflow - Hub de Engenharia e Automação"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Por Ventoflow</span>
            <ExternalLink className="h-3 w-3 text-emerald-600" />
          </a>
          <Link
            href="/gerador-link-whatsapp"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Criar Link
          </Link>
        </div>
      </div>
    </header>
  );
}
