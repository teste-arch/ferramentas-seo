"use client";

import React, { useState, useMemo, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Copy,
  Check,
  ExternalLink,
  Download,
  QrCode,
  Sparkles,
  Phone,
  MessageSquare,
  RefreshCw,
  Share2,
} from "lucide-react";

interface CountryDDI {
  name: string;
  ddi: string;
  flag: string;
}

const COUNTRIES: CountryDDI[] = [
  { name: "Brasil", ddi: "55", flag: "🇧🇷" },
  { name: "Portugal", ddi: "351", flag: "🇵🇹" },
  { name: "Estados Unidos / Canadá", ddi: "1", flag: "🇺🇸" },
  { name: "Espanha", ddi: "34", flag: "🇪🇸" },
  { name: "Reino Unido", ddi: "44", flag: "🇬🇧" },
  { name: "Argentina", ddi: "54", flag: "🇦🇷" },
  { name: "Angola", ddi: "244", flag: "🇦🇴" },
  { name: "Moçambique", ddi: "258", flag: "🇲🇿" },
  { name: "Outro País", ddi: "", flag: "🌐" },
];

const PRESET_MESSAGES = [
  "Olá! Gostaria de mais informações sobre os seus serviços.",
  "Olá! Vi seu anúncio e gostaria de solicitar um orçamento.",
  "Olá! Gostaria de agendar um horário de atendimento.",
  "Olá! Gostaria de tirar uma dúvida sobre um produto.",
];

export default function WhatsAppGenerator() {
  const [selectedCountry, setSelectedCountry] = useState<string>("55");
  const [customDdi, setCustomDdi] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [qrColor, setQrColor] = useState<string>("#0f172a");
  const qrRef = useRef<HTMLDivElement>(null);

  // Formatter for Brazilian numbers
  const formatBrazilianPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (selectedCountry === "55") {
      setPhone(formatBrazilianPhone(rawVal));
    } else {
      // Allow only numbers and spaces/hyphens for international
      const filtered = rawVal.replace(/[^\d\s-]/g, "").slice(0, 15);
      setPhone(filtered);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCountry(val);
    if (val === "55") {
      setPhone(formatBrazilianPhone(phone));
    }
  };

  // Compute Clean DDI
  const activeDdi = useMemo(() => {
    if (selectedCountry === "") {
      return customDdi.replace(/\D/g, "");
    }
    return selectedCountry;
  }, [selectedCountry, customDdi]);

  // Clean phone numbers
  const cleanPhoneDigits = useMemo(() => {
    return phone.replace(/\D/g, "");
  }, [phone]);

  // Full clean number
  const fullCleanNumber = useMemo(() => {
    if (!activeDdi || !cleanPhoneDigits) return "";
    return `${activeDdi}${cleanPhoneDigits}`;
  }, [activeDdi, cleanPhoneDigits]);

  // Validation
  const isValidNumber = useMemo(() => {
    if (selectedCountry === "55") {
      return cleanPhoneDigits.length >= 10 && cleanPhoneDigits.length <= 11;
    }
    return activeDdi.length >= 1 && cleanPhoneDigits.length >= 6;
  }, [selectedCountry, activeDdi, cleanPhoneDigits]);

  // Generated Link
  const generatedLink = useMemo(() => {
    if (!fullCleanNumber || !isValidNumber) return "";
    const baseUrl = `https://wa.me/${fullCleanNumber}`;
    if (message.trim()) {
      return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
    }
    return baseUrl;
  }, [fullCleanNumber, isValidNumber, message]);

  // Copy to clipboard
  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  // Download QR Code as PNG
  const handleDownloadQr = () => {
    if (!qrRef.current || !generatedLink) return;
    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw padding
        ctx.drawImage(img, 60, 60, 880, 880);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qrcode-whatsapp-${fullCleanNumber || "link"}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  // Clear Form
  const handleClear = () => {
    setPhone("");
    setMessage("");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Generator Form */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Phone className="h-5 w-5 text-emerald-600" />
              Dados do WhatsApp
            </h2>
            {(phone || message) && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 transition"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Limpar Campos
              </button>
            )}
          </div>

          {/* Country DDI and Phone Number */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="country-select"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                País / Código DDI
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <select
                  id="country-select"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:col-span-2"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.ddi}>
                      {c.flag} {c.name} {c.ddi ? `(+${c.ddi})` : ""}
                    </option>
                  ))}
                </select>

                {selectedCountry === "" ? (
                  <input
                    type="text"
                    placeholder="DDI (ex: 351)"
                    value={customDdi}
                    onChange={(e) => setCustomDdi(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-700">
                    +{selectedCountry}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Número do WhatsApp <span className="text-emerald-600 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone-input"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={
                    selectedCountry === "55" ? "(11) 99999-9999" : "Número de celular"
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    phone && !isValidNumber
                      ? "border-amber-400 focus:border-amber-500 focus:ring-amber-500/20"
                      : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                  }`}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                {selectedCountry === "55"
                  ? "Digite o DDD e o número com 8 ou 9 dígitos (ex: 11 98888-7777)."
                  : "Digite o número completo com o código de área correspondente."}
              </p>
            </div>
          </div>

          {/* Optional Message Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="message-input"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                Mensagem Automática (Opcional)
              </label>
              <span className="text-xs text-slate-400">{message.length} caracteres</span>
            </div>
            <textarea
              id="message-input"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Olá! Gostaria de solicitar um orçamento para o serviço..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
            />
            <p className="mt-1 text-xs text-slate-500">
              Esta mensagem será pré-carregada na conversa quando a pessoa abrir o link.
            </p>
          </div>

          {/* Preset Suggestions */}
          <div>
            <span className="block text-xs font-semibold text-slate-500 mb-2">
              Sugestões rápidas de mensagem:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_MESSAGES.map((msg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(msg)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 text-left"
                >
                  &ldquo;{msg.slice(0, 32)}...&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Output, Live Preview & QR Code */}
        <div className="flex flex-col justify-between space-y-6 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/30 border border-slate-200 p-6 lg:col-span-5">
          {/* Top: Status & Link display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <Share2 className="h-4 w-4 text-emerald-600" />
                Link Gerado em Tempo Real
              </span>
              {isValidNumber && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Pronto para uso
                </span>
              )}
            </div>

            {isValidNumber && generatedLink ? (
              <div className="space-y-3">
                {/* Link Box */}
                <div className="relative flex items-center rounded-xl border border-emerald-200 bg-white p-3 shadow-inner">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full bg-transparent pr-2 text-xs font-mono text-slate-800 select-all focus:outline-none truncate"
                  />
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-sm transition ${
                      copied
                        ? "bg-emerald-700 text-white"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-200 animate-bounce" />
                        Link Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar Link
                      </>
                    )}
                  </button>

                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-emerald-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Testar no WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-6 text-center">
                <Phone className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                <p className="text-sm font-medium text-slate-600">
                  Preencha o número do WhatsApp acima
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  O link e o QR Code serão gerados automaticamente aqui.
                </p>
              </div>
            )}

            {/* WhatsApp Chat Preview Simulation */}
            <div className="rounded-2xl border border-slate-200 bg-[#e5ddd5] p-3 shadow-inner">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                Prévia da Conversa no WhatsApp
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#dcf8c6] p-3 text-xs text-slate-900 shadow-sm">
                  <p className="whitespace-pre-wrap break-words">
                    {message.trim() || (
                      <span className="italic text-slate-500">
                        (Nenhuma mensagem pré-definida. A conversa iniciará em branco.)
                      </span>
                    )}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-500">
                    <span>12:00</span>
                    <span className="text-sky-600 font-bold">✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: QR Code Section */}
          {isValidNumber && generatedLink && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <QrCode className="h-4 w-4 text-emerald-600" />
                  QR Code do Link
                </h3>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title="QR Code Preto"
                    onClick={() => setQrColor("#0f172a")}
                    className={`h-4 w-4 rounded-full bg-slate-900 ${
                      qrColor === "#0f172a" ? "ring-2 ring-emerald-500 ring-offset-1" : ""
                    }`}
                  />
                  <button
                    type="button"
                    title="QR Code Verde WhatsApp"
                    onClick={() => setQrColor("#059669")}
                    className={`h-4 w-4 rounded-full bg-emerald-600 ${
                      qrColor === "#059669" ? "ring-2 ring-emerald-500 ring-offset-1" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div
                  ref={qrRef}
                  className="flex items-center justify-center rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                >
                  <QRCodeSVG
                    value={generatedLink}
                    size={130}
                    level="H"
                    fgColor={qrColor}
                    bgColor="#ffffff"
                    includeMargin={false}
                  />
                </div>

                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <p className="text-xs text-slate-500">
                    Aponte a câmera do celular para abrir o WhatsApp diretamente.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Baixar QR Code (PNG)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
