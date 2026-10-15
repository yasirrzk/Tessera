"use client";

import { cn } from "@/lib/utils";
import { CardType } from "@/types/card";
import {
  User, FolderOpen, Code2, GitFork, Share2, StickyNote,
  Plus, Eye, LayoutGrid, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const WIDGET_CATALOG: { type: CardType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: "PROFILE", label: "Profile Card", icon: <User className="h-4 w-4" />, desc: "Identity & status" },
  { type: "PROJECT", label: "Project Card", icon: <FolderOpen className="h-4 w-4" />, desc: "Work showcase" },
  { type: "TECH_STACK", label: "Tech Stack", icon: <Code2 className="h-4 w-4" />, desc: "Skills & stack" },
  { type: "GITHUB_STATS", label: "GitHub Stats", icon: <GitFork className="h-4 w-4" />, desc: "Dev metrics" },
  { type: "SOCIAL_LINKS", label: "Social Links", icon: <Share2 className="h-4 w-4" />, desc: "Direct channels" },
  { type: "CUSTOM_NOTE", label: "Custom Note", icon: <StickyNote className="h-4 w-4" />, desc: "Markdown memo" },
];

interface EditorSidebarProps {
  onAddCard?: (type: CardType) => void;
  onPublish?: () => void;
  isPublished?: boolean;
  isPreviewMode?: boolean;
  onTogglePreview?: () => void;
}

export function EditorSidebar({
  onAddCard,
  onPublish,
  isPublished,
  isPreviewMode,
  onTogglePreview,
}: EditorSidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r-2 border-[var(--border-color)] bg-[var(--bg-surface)] shrink-0">
      {/* Header */}
      <div className="border-b-2 border-[var(--border-color)] px-4 py-3 bg-[var(--background)] flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
          {"//"} WIDGET_CATALOG
        </p>
        <span className="font-mono text-[9px] uppercase font-bold bg-[#FFDE59] text-black border border-black px-1">
          ADD
        </span>
      </div>

      {/* Widget List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {WIDGET_CATALOG.map((widget) => (
          <button
            key={widget.type}
            onClick={() => onAddCard?.(widget.type)}
            className={cn(
              "w-full flex items-start gap-3 rounded-none border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-2.5 text-left transition-all duration-75 cursor-pointer select-none",
              "shadow-[2px_2px_0px_var(--border-color)]",
              "hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--border-color)] hover:bg-[#FFDE59] hover:text-black group",
              "active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            )}
          >
            <span className="mt-0.5 shrink-0 text-[var(--text-secondary)] group-hover:text-black transition-colors">
              {widget.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-black leading-tight mb-0.5">
                {widget.label}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] group-hover:text-black/80 font-mono truncate">
                {widget.desc}
              </p>
            </div>
            <Plus className="ml-auto h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--text-muted)] group-hover:text-black transition-colors" />
          </button>
        ))}

        <div className="pt-3 pb-1 border-t-2 border-dashed border-[var(--border-color)] px-1">
          <p className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)] mb-1">
            GRID_CONFIG {"//"}
          </p>
          <p className="font-mono text-[10px] text-[var(--text-secondary)]">
            4-Column Modular Canvas<br />
            Hard Shadow: 4px Solid<br />
            Border: 2px Solid
          </p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t-2 border-[var(--border-color)] p-3 space-y-2 bg-[var(--background)]">
        <Button
          variant={isPreviewMode ? "primary" : "outline"}
          size="sm"
          className="w-full justify-center gap-2"
          onClick={onTogglePreview}
        >
          {isPreviewMode ? (
            <>
              <ArrowLeft className="h-3.5 w-3.5" /> EDIT MODE
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" /> PREVIEW MODE
            </>
          )}
        </Button>
        <Button
          variant={isPublished ? "secondary" : "primary"}
          size="sm"
          className="w-full justify-center gap-2"
          onClick={onPublish}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          {isPublished ? "PUBLISHED (LIVE) ✓" : "PUBLISH PAGE"}
        </Button>
      </div>
    </aside>
  );
}
