import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para concatenar e mesclar classes Tailwind condicionalmente
 * resolvendo conflitos de especificidade via tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
