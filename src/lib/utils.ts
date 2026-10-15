import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CardSize = "1x1" | "2x1" | "1x2" | "2x2";

export function sizeToColSpan(size: CardSize): { col: number; row: number } {
  const map: Record<CardSize, { col: number; row: number }> = {
    "1x1": { col: 1, row: 1 },
    "2x1": { col: 2, row: 1 },
    "1x2": { col: 1, row: 2 },
    "2x2": { col: 2, row: 2 },
  };
  return map[size];
}

export const GRID_COLS = 4;
export const CARD_MIN_H = 200; // px per row unit
