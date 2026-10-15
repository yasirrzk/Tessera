"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { BentoCard as BentoCardType } from "@/types/card";
import { SortableBentoCard, StaticBentoCard } from "./SortableBentoCard";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  cards: BentoCardType[];
  onReorder?: (cards: BentoCardType[]) => void;
  editable?: boolean;
  onEditCard?: (card: BentoCardType) => void;
  onDeleteCard?: (id: string) => void;
}

export function BentoGrid({
  cards,
  onReorder,
  editable = false,
  onEditCard,
  onDeleteCard,
}: BentoGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over || active.id === over.id) return;

      const oldIndex = cards.findIndex((c) => c.id === active.id);
      const newIndex = cards.findIndex((c) => c.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newCards = [...cards];
      const [moved] = newCards.splice(oldIndex, 1);
      newCards.splice(newIndex, 0, moved);

      const reordered = newCards.map((c, i) => ({ ...c, order: i }));
      onReorder?.(reordered);
    },
    [cards, onReorder]
  );

  // If not in editor mode or during SSR / initial hydration, render static HTML to prevent any hydration mismatch
  if (!editable || !isMounted) {
    return (
      <div
        className={cn(
          "grid gap-3",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          "auto-rows-[minmax(180px,auto)]"
        )}
      >
        {cards.map((card) => (
          <StaticBentoCard
            key={card.id}
            card={card}
            editable={editable}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      id="bento-grid-dnd"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={cards.map((c) => c.id)} strategy={rectSortingStrategy}>
        <div
          className={cn(
            "grid gap-3",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            "auto-rows-[minmax(180px,auto)]"
          )}
        >
          {cards.map((card) => (
            <SortableBentoCard
              key={card.id}
              card={card}
              editable={editable}
              isDragging={activeId === card.id}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
