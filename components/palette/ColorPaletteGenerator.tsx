"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  RefreshCw,
  Download,
  Code,
  Sparkles,
  Sliders,
  Palette,
  Eye,
  Shuffle,
  FileCode,
  X,
} from "lucide-react";

import { SITE_URL, SITE_NAME } from "@/lib/constants";

interface ColorSwatch {
  id: string;
  hex: string;
  isLocked: boolean;
}

// Conversões de Cores
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Calcula contraste para texto preto ou branco
function getContrastColor(hex: string): "dark" | "light" {
  try {
    const { r, g, b } = hexToRgb(hex);
    // Luminância relativa (padrão WCAG)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 140 ? "dark" : "light";
  } catch {
    return "dark";
  }
}

// Gerador de Paletas Harmônicas
function generateHarmoniousPalette(existing: ColorSwatch[]): ColorSwatch[] {
  const baseHue = Math.floor(Math.random() * 360);
  const schemeType = Math.floor(Math.random() * 4); // 0: análoga, 1: complementar, 2: triádica, 3: moderna balanceada

  const newHslList: { h: number; s: number; l: number }[] = [];

  if (schemeType === 0) {
    // Análoga
    newHslList.push({ h: baseHue, s: 70, l: 45 });
    newHslList.push({ h: (baseHue + 25) % 360, s: 65, l: 55 });
    newHslList.push({ h: (baseHue + 50) % 360, s: 60, l: 65 });
    newHslList.push({ h: (baseHue - 25 + 360) % 360, s: 50, l: 30 });
    newHslList.push({ h: (baseHue + 180) % 360, s: 75, l: 50 }); // acento complementar
  } else if (schemeType === 1) {
    // Complementar balanceada
    const compHue = (baseHue + 180) % 360;
    newHslList.push({ h: baseHue, s: 75, l: 40 });
    newHslList.push({ h: baseHue, s: 60, l: 65 });
    newHslList.push({ h: compHue, s: 70, l: 50 });
    newHslList.push({ h: compHue, s: 50, l: 75 });
    newHslList.push({ h: (baseHue + 30) % 360, s: 20, l: 90 }); // neutro claro
  } else if (schemeType === 2) {
    // Triádica
    newHslList.push({ h: baseHue, s: 70, l: 48 });
    newHslList.push({ h: (baseHue + 120) % 360, s: 65, l: 55 });
    newHslList.push({ h: (baseHue + 240) % 360, s: 65, l: 60 });
    newHslList.push({ h: baseHue, s: 30, l: 85 });
    newHslList.push({ h: (baseHue + 120) % 360, s: 40, l: 25 });
  } else {
    // Moderna para UI
    newHslList.push({ h: baseHue, s: 80, l: 50 }); // primária vibrante
    newHslList.push({ h: (baseHue + 35) % 360, s: 75, l: 60 }); // secundária
    newHslList.push({ h: (baseHue + 180) % 360, s: 85, l: 55 }); // destaque/CTA
    newHslList.push({ h: (baseHue + 10) % 360, s: 25, l: 94 }); // fundo neutro
    newHslList.push({ h: baseHue, s: 35, l: 15 }); // texto/escuro
  }

  return existing.map((swatch, idx) => {
    if (swatch.isLocked) {
      return swatch;
    }
    const hsl = newHslList[idx] || { h: Math.random() * 360, s: 60, l: 50 };
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    return {
      ...swatch,
      hex: rgbToHex(rgb.r, rgb.g, rgb.b),
    };
  });
}

const INITIAL_PALETTE: ColorSwatch[] = [
  { id: "c1", hex: "#059669", isLocked: false },
  { id: "c2", hex: "#0D9488", isLocked: false },
  { id: "c3", hex: "#3B82F6", isLocked: false },
  { id: "c4", hex: "#F59E0B", isLocked: false },
  { id: "c5", hex: "#0F172A", isLocked: false },
];

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<ColorSwatch[]>(INITIAL_PALETTE);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [isCssModalOpen, setIsCssModalOpen] = useState<boolean>(false);
  const [cssCopied, setCssCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gera nova paleta
  const handleGenerate = useCallback(() => {
    setPalette((prev) => generateHarmoniousPalette(prev));
  }, []);

  // Atalho por teclado (Barra de Espaço)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se estiver digitando em um input ou modal aberto
      if (
        e.code === "Space" &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) &&
        !isCssModalOpen
      ) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate, isCssModalOpen]);

  // Alterna trava de cor
  const toggleLock = (id: string) => {
    setPalette((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isLocked: !item.isLocked } : item))
    );
  };

  // Edita cor manualmente
  const handleColorChange = (id: string, newHex: string) => {
    setPalette((prev) =>
      prev.map((item) => (item.id === id ? { ...item, hex: newHex.toUpperCase() } : item))
    );
  };

  // Copia valor específico para o clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(label);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  // Gera código CSS (:root)
  const cssVariablesCode = `:root {
  --color-primary: ${palette[0].hex};
  --color-secondary: ${palette[1].hex};
  --color-accent: ${palette[2].hex};
  --color-surface: ${palette[3].hex};
  --color-background: ${palette[4].hex};
}`;

  const copyCssCode = async () => {
    try {
      await navigator.clipboard.writeText(cssVariablesCode);
      setCssCopied(true);
      setTimeout(() => setCssCopied(false), 2500);
    } catch (err) {
      console.error("Falha ao copiar CSS:", err);
    }
  };

  // Exportar como imagem PNG via Canvas
  const handleExportPng = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    // Fundo do Card
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cabeçalho da imagem
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("Paleta de Cores Harmônicas", 60, 70);

    ctx.fillStyle = "#64748b";
    ctx.font = "18px sans-serif";
    ctx.fillText(`Gerado por ${SITE_NAME} (${SITE_URL.replace(/^https?:\/\//, "")})`, 60, 105);

    // 5 Barras de Cores
    const startX = 60;
    const startY = 140;
    const totalWidth = 1080;
    const swatchWidth = totalWidth / 5;
    const swatchHeight = 360;

    palette.forEach((swatch, index) => {
      const x = startX + index * swatchWidth;

      // Desenha retângulo da cor
      ctx.fillStyle = swatch.hex;
      ctx.beginPath();
      // Arredonda apenas os cantos externos
      ctx.fillRect(x, startY, swatchWidth, swatchHeight);

      // Caixa de legenda embaixo
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(x, startY + swatchHeight, swatchWidth, 60);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "center";
      ctx.fillText(swatch.hex, x + swatchWidth / 2, startY + swatchHeight + 38);
    });

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `paleta-de-cores-${palette.map((p) => p.hex.replace("#", "")).join("-")}.png`;
    downloadLink.href = pngUrl;
    downloadLink.click();
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-95"
          >
            <Shuffle className="h-4 w-4" />
            Gerar Nova Paleta
          </button>
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            Dica: Pressione <kbd className="rounded bg-white px-1.5 py-0.5 font-mono shadow-sm">Espaço</kbd>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportPng}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-emerald-600"
          >
            <Download className="h-4 w-4 text-emerald-600" />
            Baixar Imagem PNG
          </button>

          <button
            type="button"
            onClick={() => setIsCssModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-emerald-600"
          >
            <FileCode className="h-4 w-4 text-blue-600" />
            Exportar CSS
          </button>
        </div>
      </div>

      {/* Main Interactive Swatches Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 rounded-3xl overflow-hidden shadow-sm border border-slate-200 min-h-[380px]">
        {palette.map((swatch, index) => {
          const contrast = getContrastColor(swatch.hex);
          const isDark = contrast === "dark";
          const textColor = isDark ? "text-slate-900" : "text-white";
          const subTextColor = isDark ? "text-slate-700" : "text-slate-200";
          const btnBg = isDark ? "bg-white/80 hover:bg-white text-slate-900" : "bg-black/40 hover:bg-black/60 text-white";

          const rgb = hexToRgb(swatch.hex);
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

          return (
            <div
              key={swatch.id}
              style={{ backgroundColor: swatch.hex }}
              className="group relative flex flex-col justify-between p-5 transition-all duration-300 min-h-[280px] sm:min-h-[420px]"
            >
              {/* Top Controls: Lock & Color Picker */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleLock(swatch.id)}
                  title={swatch.isLocked ? "Destravar cor" : "Travar cor"}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition shadow-sm ${btnBg} ${
                    swatch.isLocked ? "ring-2 ring-emerald-500 scale-105" : "opacity-80 group-hover:opacity-100"
                  }`}
                >
                  {swatch.isLocked ? (
                    <Lock className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </button>

                {/* Color Picker Native trigger */}
                <label
                  title="Editar cor manualmente"
                  className={`cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition shadow-sm ${btnBg} opacity-80 group-hover:opacity-100`}
                >
                  <Palette className="h-4 w-4" />
                  <input
                    type="color"
                    value={swatch.hex}
                    onChange={(e) => handleColorChange(swatch.id, e.target.value)}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Center / Bottom Info */}
              <div className="space-y-4 pt-6">
                {/* Main HEX Header */}
                <div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${subTextColor}`}>
                    Cor {index + 1}
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${textColor}`}>
                      {swatch.hex}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(swatch.hex, `hex-${swatch.id}`)}
                      title="Copiar HEX"
                      className={`rounded-lg p-1.5 backdrop-blur-md transition shadow-sm ${btnBg}`}
                    >
                      {copiedFormat === `hex-${swatch.id}` ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Secondary Formats: RGB & HSL */}
                <div className={`space-y-1.5 border-t border-white/20 pt-3 text-xs font-mono ${subTextColor}`}>
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-1">{rgbString}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(rgbString, `rgb-${swatch.id}`)}
                      title="Copiar RGB"
                      className="hover:underline opacity-80 hover:opacity-100"
                    >
                      {copiedFormat === `rgb-${swatch.id}` ? "Copiado!" : "RGB"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="truncate pr-1">{hslString}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(hslString, `hsl-${swatch.id}`)}
                      title="Copiar HSL"
                      className="hover:underline opacity-80 hover:opacity-100"
                    >
                      {copiedFormat === `hsl-${swatch.id}` ? "Copiado!" : "HSL"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS Export Modal */}
      {isCssModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Variáveis CSS da Paleta</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCssModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Copie o código abaixo e cole no seu arquivo <code className="font-mono text-emerald-700 bg-emerald-50 px-1 rounded">globals.css</code> ou folha de estilos:
            </p>

            <pre className="rounded-xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
              {cssVariablesCode}
            </pre>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCssModalOpen(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={copyCssCode}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
              >
                {cssCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    CSS Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar Código CSS
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
