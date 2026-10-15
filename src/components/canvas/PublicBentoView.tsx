"use client";

import { useEffect, useState } from "react";
import { BentoGrid } from "@/components/canvas/BentoGrid";
import { BentoCard } from "@/types/card";

interface PublicBentoViewProps {
  initialCards: BentoCard[];
}

export function PublicBentoView({ initialCards }: PublicBentoViewProps) {
  const [cards, setCards] = useState<BentoCard[]>(initialCards);

  useEffect(() => {
    try {
      const savedCards = localStorage.getItem("bento_cards");
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  return (
    <div className="transition-colors duration-150">
      <BentoGrid cards={cards} editable={false} />
    </div>
  );
}
