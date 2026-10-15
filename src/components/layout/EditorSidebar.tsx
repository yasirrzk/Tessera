"use client";

import { cn } from "@/lib/utils";
import { CardType } from "@/types/card";
import {
  User, FolderOpen, Code2, GitFork, Share2, StickyNote,
  Plus, Eye, LayoutGrid, Palette, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const WIDGET_CATALOG: { type: CardType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: "PROFILE", label: "Profile", icon: <User className="h-4 w-4" />, desc: "Name, bio & status" },
  { type: "PROJECT", label: "Project", icon: <FolderOpen className="h-4 w-4" />, desc: "Project showcase" },
  { type: "TECH_STACK", label: "Tech Stack", icon: <Code2 className="h-4 w-4" />, desc: "Skills & technologies" },
  { type: "GITHUB_STATS", label: "GitHub Stats", icon: <GitFork className="h-4 w-4" />, desc: "Stars, repos & contribs" },
  { type: "SOCIAL_LINKS", label: "Social Links", icon: <Share2 className="h-4 w-4" />, desc: "GitHub, LinkedIn & more" },
  { type: "CUSTOM_NOTE", label: "Custom Note", icon: <StickyNote className="h-4 w-4" />, desc: "Free-form markdown text" },
];

export type ThemePreset = "velvet" | "industrial" | "brutalism" | "swiss";

const PRESET_OPTIONS: { id: ThemePreset; label: string; accentColor: string }[] = [
  { id: "velvet", label: "Velvet Noir", accentColor: "#f59e0b" },
  { id: "industrial", label: "Industrial", accentColor: "#ff5500" },
  { id: "brutalism", label: "Brutalism", accentColor: "#ffffff" },
  { id: "swiss", label: "Swiss Clean", accentColor: "#1d4ed8" },
];

interface EditorSidebarProps {
  onAddCard?: (type: CardType) => void;
  onPublish?: () => void;
  isPublished?: boolean;
  isPreviewMode?: boolean;
  onTogglePreview?: () => void;
  preset?: ThemePreset;
  onPresetChange?: (preset: ThemePreset) => void;
}

export function EditorSidebar({
  onAddCard,
  onPublish,
  isPublished,
  isPreviewMode,
  onTogglePreview,
  preset = "velvet",
  onPresetChange,
}: EditorSidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-[var(--border-color)] bg-[var(--bg-surface)] shrink-0">
      {/* Widget Catalog Section */}
      <div className="border-b border-[var(--border-color)] px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Widget Catalog
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {WIDGET_CATALOG.map((widget) => (
          <button
            key={widget.type}
            onClick={() => onAddCard?.(widget.type)}
            className={cn(
              "w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer",
              "hover:bg-white/5 border border-transparent hover:border-[var(--border-color)] group"
            )}
          >
            <span className="mt-0.5 shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
              {widget.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] leading-none mb-1">
                {widget.label}
              </p>
              <p className="text-xs text-[var(--text-muted)] font-mono truncate">{widget.desc}</p>
            </div>
            <Plus className="ml-auto h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
          </button>
        ))}

        {/* Theme Presets Section */}
        <div className="pt-4 pb-1">
          <div className="flex items-center gap-1.5 px-2 mb-2">
            <Palette className="h-3 w-3 text-[var(--text-muted)]" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Theme Presets
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1">
            {PRESET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onPresetChange?.(opt.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left border transition-all text-xs font-mono cursor-pointer",
                  preset === opt.id
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-primary)]"
                    : "border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                )}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: opt.accentColor }}
                />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-[var(--border-color)] p-3 space-y-2">
        <Button
          variant={isPreviewMode ? "primary" : "outline"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={onTogglePreview}
        >
          {isPreviewMode ? (
            <>
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Edit
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" /> Preview Mode
            </>
          )}
        </Button>
        <Button
          variant={isPublished ? "outline" : "primary"}
          size="sm"
          className={cn(
            "w-full justify-start gap-2",
            isPublished && "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          )}
          onClick={onPublish}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          {isPublished ? "Published (Live) ✓" : "Publish Portfolio"}
        </Button>
      </div>
    </aside>
  );
}
