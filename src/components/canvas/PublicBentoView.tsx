"use client";

import { useEffect, useState } from "react";
import { BentoGrid } from "@/components/canvas/BentoGrid";
import { BentoCard } from "@/types/card";
import { ThemePreset } from "@/components/layout/EditorSidebar";

interface PublicBentoViewProps {
  initialCards: BentoCard[];
  initialPreset?: ThemePreset;
}

export function PublicBentoView({ initialCards, initialPreset = "velvet" }: PublicBentoViewProps) {
  const [cards, setCards] = useState<BentoCard[]>(initialCards);
  const [preset, setPreset] = useState<ThemePreset>(initialPreset);

  useEffect(() => {
    try {
      const savedCards = localStorage.getItem("bento_cards");
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
      const savedPreset = localStorage.getItem("bento_preset") as ThemePreset | null;
      if (savedPreset) {
        setPreset(savedPreset);
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  return (
    <div data-preset={preset} className="transition-colors duration-200">
      <BentoGrid cards={cards} editable={false} />
    </div>
  );
}
