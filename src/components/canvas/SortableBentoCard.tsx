"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BentoCard as BentoCardType, CardSize } from "@/types/card";
import { cn } from "@/lib/utils";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { TechStackCard } from "@/components/cards/TechStackCard";
import { SocialLinksCard } from "@/components/cards/SocialLinksCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { GitHubStatsCard } from "@/components/cards/GitHubStatsCard";
import { CustomNoteCard } from "@/components/cards/CustomNoteCard";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import {
  ProfileContent,
  TechStackContent,
  SocialLinksContent,
  ProjectContent,
  GitHubStatsContent,
  CustomNoteContent,
} from "@/types/card";

interface SortableBentoCardProps {
  card: BentoCardType;
  editable?: boolean;
  isDragging?: boolean;
  onEdit?: (card: BentoCardType) => void;
  onDelete?: (id: string) => void;
}

function getColSpan(w: number): string {
  return w === 2 ? "sm:col-span-2" : "col-span-1";
}

function getRowSpan(h: number): string {
  return h === 2 ? "row-span-2" : "row-span-1";
}

function getCardSize(w: number, h: number): CardSize {
  if (w === 2 && h === 2) return "2x2";
  if (w === 2 && h === 1) return "2x1";
  if (w === 1 && h === 2) return "1x2";
  return "1x1";
}

export function CardContentRenderer({ card }: { card: BentoCardType }) {
  const size = getCardSize(card.layout.w, card.layout.h);
  switch (card.type) {
    case "PROFILE":
      return <ProfileCard content={card.content as ProfileContent} size={size} />;
    case "TECH_STACK":
      return <TechStackCard content={card.content as TechStackContent} />;
    case "SOCIAL_LINKS":
      return <SocialLinksCard content={card.content as SocialLinksContent} size={size} />;
    case "PROJECT":
      return <ProjectCard content={card.content as ProjectContent} size={size} />;
    case "GITHUB_STATS":
      return <GitHubStatsCard content={card.content as GitHubStatsContent} />;
    case "CUSTOM_NOTE":
      return <CustomNoteCard content={card.content as CustomNoteContent} size={size} />;
    default:
      return null;
  }
}

export function StaticBentoCard({
  card,
  editable = false,
  onEdit,
  onDelete,
}: {
  card: BentoCardType;
  editable?: boolean;
  onEdit?: (card: BentoCardType) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        getColSpan(card.layout.w),
        getRowSpan(card.layout.h),
        "relative group transition-all duration-100"
      )}
    >
      <div className="h-full">
        <CardContentRenderer card={card} />
      </div>

      {editable && (
        <div className="absolute inset-0 rounded-none pointer-events-none group-hover:bg-black/5 transition-colors duration-100">
          <div className="pointer-events-auto absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
            <button
              onClick={() => onEdit?.(card)}
              title="Edit Card"
              className="flex h-7 w-7 items-center justify-center rounded-none bg-[#FFDE59] border-2 border-black text-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete?.(card.id)}
              title="Delete Card"
              className="flex h-7 w-7 items-center justify-center rounded-none bg-[#FF5722] border-2 border-black text-white shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SortableBentoCard({
  card,
  editable = false,
  isDragging = false,
  onEdit,
  onDelete,
}: SortableBentoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id: card.id, disabled: !editable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isSorting ? transition : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        getColSpan(card.layout.w),
        getRowSpan(card.layout.h),
        "relative group",
        isDragging && "opacity-60 scale-[0.98] z-50",
        "transition-all duration-100"
      )}
    >
      {/* Card Content */}
      <div className="h-full">
        <CardContentRenderer card={card} />
      </div>

      {/* Editor Overlay Controls */}
      {editable && (
        <div className="absolute inset-0 rounded-none pointer-events-none group-hover:bg-black/5 transition-colors duration-100">
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            title="Drag to reorder"
            className={cn(
              "pointer-events-auto absolute top-2 left-2 z-20",
              "flex h-7 w-7 items-center justify-center rounded-none",
              "bg-white dark:bg-[#1A1C23] border-2 border-[var(--border-color)] text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-color)]",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-100",
              "cursor-grab active:cursor-grabbing hover:bg-[#FFDE59] hover:text-black"
            )}
          >
            <GripVertical className="h-3.5 w-3.5" />
          </button>

          {/* Edit / Delete */}
          <div
            className={cn(
              "pointer-events-auto absolute top-2 right-2 z-20 flex items-center gap-1.5",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-100"
            )}
          >
            <button
              onClick={() => onEdit?.(card)}
              title="Edit Card"
              className="flex h-7 w-7 items-center justify-center rounded-none bg-[#FFDE59] border-2 border-[var(--border-color)] text-black shadow-[2px_2px_0px_var(--border-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete?.(card.id)}
              title="Delete Card"
              className="flex h-7 w-7 items-center justify-center rounded-none bg-[#FF5722] border-2 border-[var(--border-color)] text-white shadow-[2px_2px_0px_var(--border-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
