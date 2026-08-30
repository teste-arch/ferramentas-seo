import React from "react";
import { cn } from "@/lib/utils";

export type VentoSymbolSize = "sm" | "small" | "default" | "md" | "lg" | "large" | "xl" | number;

export interface VentoSymbolProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Tamanho do símbolo:
   * - "sm" | "small": 48x32px
   * - "default" | "md": 90x55px
   * - "lg" | "large": 120x73px
   * - "xl": 160x98px
   * - number: define a largura em px mantendo o aspect ratio exato (90:55)
   */
  size?: VentoSymbolSize;
  /**
   * Se true, ativa o fluxo contínuo e orgânico de vento (staggered breeze animation).
   * @default false
   */
  animated?: boolean;
  /**
   * Cor primária das linhas de vento.
   * @default "#9BD88A"
   */
  color?: string;
  /**
   * Classes extras do Tailwind CSS.
   */
  className?: string;
}

const SIZE_MAP: Record<string, { width: number; height: number }> = {
  sm: { width: 48, height: 32 },
  small: { width: 48, height: 32 },
  default: { width: 90, height: 55 },
  md: { width: 90, height: 55 },
  lg: { width: 120, height: 73 },
  large: { width: 120, height: 73 },
  xl: { width: 160, height: 98 },
};

export function VentoSymbol({
  size = "default",
  animated = false,
  color = "#9BD88A",
  className,
  ...props
}: VentoSymbolProps) {
  // Resolução dinâmica de dimensões mantendo a proporção de 90x55
  let dimensions: { width: number | string; height: number | string };

  if (typeof size === "number") {
    dimensions = {
      width: size,
      height: Math.round((size * 55) / 90),
    };
  } else {
    dimensions = SIZE_MAP[size] || SIZE_MAP.default;
  }

  return (
    <svg
      viewBox="0 0 90 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions.width}
      height={dimensions.height}
      className={cn(
        "inline-block shrink-0 overflow-visible select-none",
        className
      )}
      role="img"
      aria-label="VentoFlow Symbol"
      {...props}
    >
      {/* Grupo com rotação de -8 graus centralizado no viewBox (45, 27.5) */}
      <g transform="rotate(-8 45 27.5)">
        {/* Linha 1 (Superior) - Fluxo Inicial */}
        <path
          d="M 22 16 L 70 16"
          stroke={color}
          strokeWidth="5.5"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            animated ? "animate-vento-1" : "opacity-90"
          )}
          style={
            animated
              ? {
                  animation: "ventoFlow1 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0s",
                  transformOrigin: "center left",
                }
              : undefined
          }
        />

        {/* Linha 2 (Central) - Fluxo Principal mais longo */}
        <path
          d="M 12 27.5 L 80 27.5"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            animated ? "animate-vento-2" : "opacity-100"
          )}
          style={
            animated
              ? {
                  animation: "ventoFlow2 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.25s",
                  transformOrigin: "center left",
                }
              : undefined
          }
        />

        {/* Linha 3 (Inferior) - Fluxo de sustentação */}
        <path
          d="M 26 39 L 62 39"
          stroke={color}
          strokeWidth="5.5"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            animated ? "animate-vento-3" : "opacity-85"
          )}
          style={
            animated
              ? {
                  animation: "ventoFlow3 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.5s",
                  transformOrigin: "center left",
                }
              : undefined
          }
        />
      </g>
    </svg>
  );
}

export default VentoSymbol;