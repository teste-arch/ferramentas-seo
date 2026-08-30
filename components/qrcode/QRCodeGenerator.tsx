"use client";

import React, { useState, useRef, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  QrCode,
  Download,
  Copy,
  Check,
  RefreshCw,
  Palette,
  Sliders,
  Sparkles,
  Link2,
  FileText,
  Share2,
  CheckCircle2,
} from "lucide-react";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

interface PresetColor {
  name: string;
  hex: string;
}

const FG_PRESET_COLORS: PresetColor[] = [
  { name: "Preto Clássico", hex: "#000000" },
  { name: "Verde WhatsApp", hex: "#059669" },
  { name: "Azul Royal", hex: "#2563eb" },
  { name: "Vermelho Rubi", hex: "#dc2626" },
  { name: "Roxo Moderno", hex: "#7c3aed" },
  { name: "Ardósia Escura", hex: "#0f172a" },
];

const BG_PRESET_COLORS: PresetColor[] = [
  { name: "Branco Puro", hex: "#ffffff" },
  { name: "Cinza Gelo", hex: "#f8fafc" },
  { name: "Amarelo Suave", hex: "#fefce8" },
  { name: "Menta Claro", hex: "#ecfdf5" },
];

const DOWNLOAD_SIZES = [
  { label: "300 x 300 px (Web)", value: 300 },
  { label: "600 x 600 px (Cartões)", value: 600 },
  { label: "1000 x 1000 px (Alta Resolução)", value: 1000 },
  { label: "2000 x 2000 px (Gráfica / Impressão)", value: 2000 },
];

export default function QRCodeGenerator() {
  const [content, setContent] = useState<string>("https://");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("M");
  const [includeMargin, setIncludeMargin] = useState<boolean>(true);
  const [downloadSize, setDownloadSize] = useState<number>(1000);
  const [copied, setCopied] = useState<boolean>(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const isContentValid = useMemo(() => {
    return content.trim().length > 0 && content.trim() !== "https://" && content.trim() !== "http://";
  }, [content]);

  // Quick preset content fillers
  const handleQuickContent = (type: "url" | "whatsapp" | "wifi") => {
    if (type === "url") {
      setContent("https://seusite.com.br");
    } else if (type === "whatsapp") {
      setContent("https://wa.me/5511999999999?text=Olá!");
    } else if (type === "wifi") {
      setContent("WIFI:S:NomeDaSuaRede;T:WPA;P:SuaSenhaAqui;;");
    }
  };

  const handleClear = () => {
    setContent("");
  };

  // Download as PNG
  const handleDownloadPng = () => {
    if (!qrContainerRef.current || !isContentValid) return;
    const svgElement = qrContainerRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = downloadSize;
      canvas.height = downloadSize;
      if (ctx) {
        // Background fill
        ctx.fillStyle = bgColor === "transparent" ? "rgba(255,255,255,0)" : bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(img, 0, 0, downloadSize, downloadSize);
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qrcode-${downloadSize}x${downloadSize}.png`;
        downloadLink.href = pngUrl;
        downloadLink.click();
      }
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  // Download as SVG
  const handleDownloadSvg = () => {
    if (!qrContainerRef.current || !isContentValid) return;
    const svgElement = qrContainerRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement("a");
    downloadLink.download = "qrcode-vetorial.svg";
    downloadLink.href = blobUrl;
    downloadLink.click();
    URL.revokeObjectURL(blobUrl);
  };

  // Copy content
  const handleCopyContent = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Form & Customization */}
        <div className="space-y-6 lg:col-span-7">
          {/* Header & Reset */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <QrCode className="h-5 w-5 text-emerald-600" />
              Conteúdo do QR Code
            </h2>
            {content && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 transition"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Limpar Campo
              </button>
            )}
          </div>

          {/* Input Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="qr-content-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Link (URL) ou Texto Livre <span className="text-emerald-600 font-bold">*</span>
              </label>
              <span className="text-xs text-slate-400">{content.length} caracteres</span>
            </div>
            <div className="relative">
              <textarea
                id="qr-content-input"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://seusite.com.br ou qualquer texto..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
              />
            </div>

            {/* Quick Presets */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">Exemplos rápidos:</span>
              <button
                type="button"
                onClick={() => handleQuickContent("url")}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <Link2 className="h-3 w-3" />
                URL / Site
              </button>
              <button
                type="button"
                onClick={() => handleQuickContent("whatsapp")}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <Share2 className="h-3 w-3 text-emerald-600" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleQuickContent("wifi")}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition"
              >
                <FileText className="h-3 w-3" />
                Rede Wi-Fi
              </button>
            </div>
          </div>

          {/* Customization Options Accordion/Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Palette className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Personalização Visual</h3>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* QR Code Foreground Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Cor do QR Code
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-9 w-10 cursor-pointer rounded-lg border border-slate-300 bg-white p-0.5"
                    title="Escolher cor personalizada"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-24 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-800 uppercase focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FG_PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => setFgColor(c.hex)}
                      className={`h-6 w-6 rounded-md border border-slate-300 transition ${
                        fgColor.toLowerCase() === c.hex.toLowerCase()
                          ? "ring-2 ring-emerald-500 ring-offset-1 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Cor de Fundo
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={bgColor === "transparent" ? "#ffffff" : bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-9 w-10 cursor-pointer rounded-lg border border-slate-300 bg-white p-0.5"
                    title="Escolher cor de fundo personalizada"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-24 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-800 uppercase focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {BG_PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => setBgColor(c.hex)}
                      className={`h-6 w-6 rounded-md border border-slate-300 transition ${
                        bgColor.toLowerCase() === c.hex.toLowerCase()
                          ? "ring-2 ring-emerald-500 ring-offset-1 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Error Correction & Margins */}
            <div className="grid grid-cols-1 gap-5 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nível de Correção de Erro
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as ErrorCorrectionLevel)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="L">Baixo (L - 7% recuperação)</option>
                  <option value="M">Médio (M - 15% recuperação - Padrão)</option>
                  <option value="Q">Quartil (Q - 25% recuperação)</option>
                  <option value="H">Alto (H - 30% recuperação - Impressos)</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-500">
                  Níveis mais altos garantem leitura mesmo se o código estiver parcialmente danificado.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Margem de Segurança (Zona Silenciosa)
                </label>
                <div className="flex items-center gap-3 pt-1">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={includeMargin}
                      onChange={(e) => setIncludeMargin(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none" />
                    <span className="ml-2.5 text-xs font-medium text-slate-700">
                      {includeMargin ? "Com margem branca" : "Sem margem"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live QR Preview & Downloads */}
        <div className="flex flex-col justify-between space-y-6 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/30 border border-slate-200 p-6 lg:col-span-5">
          {/* Top Status */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Prévia em Tempo Real
            </span>
            {isContentValid ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                QR Code Válido
              </span>
            ) : (
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                Aguardando texto
              </span>
            )}
          </div>

          {/* QR Code Canvas/SVG Display */}
          <div className="flex flex-col items-center justify-center py-4">
            <div
              ref={qrContainerRef}
              className="flex items-center justify-center rounded-2xl border border-slate-200 p-4 shadow-md transition hover:shadow-lg"
              style={{ backgroundColor: bgColor === "transparent" ? "#ffffff" : bgColor }}
            >
              {isContentValid ? (
                <QRCodeSVG
                  value={content}
                  size={200}
                  level={errorLevel}
                  fgColor={fgColor}
                  bgColor={bgColor === "transparent" ? "transparent" : bgColor}
                  includeMargin={includeMargin}
                />
              ) : (
                <div className="flex h-[200px] w-[200px] flex-col items-center justify-center text-center p-4 text-slate-400">
                  <QrCode className="h-16 w-16 text-slate-300 stroke-[1.5] mb-2" />
                  <p className="text-xs font-medium text-slate-500">
                    Digite ou cole um link para gerar o QR Code
                  </p>
                </div>
              )}
            </div>

            {isContentValid && (
              <p className="mt-3 text-center text-xs text-slate-500">
                Aponte a câmera do seu smartphone para testar agora.
              </p>
            )}
          </div>

          {/* Download Options */}
          {isContentValid && (
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div>
                <label
                  htmlFor="download-size"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Resolução do Download (PNG)
                </label>
                <select
                  id="download-size"
                  value={downloadSize}
                  onChange={(e) => setDownloadSize(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none"
                >
                  {DOWNLOAD_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  <Download className="h-4 w-4" />
                  Baixar PNG
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-emerald-600"
                >
                  <Download className="h-4 w-4 text-emerald-600" />
                  Baixar SVG
                </button>
              </div>

              <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[11px] text-slate-400">
                <span>100% Grátis & Alta Resolução</span>
                <button
                  type="button"
                  onClick={handleCopyContent}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 transition"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      Texto Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar Conteúdo
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
