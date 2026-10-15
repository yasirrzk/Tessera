"use client";

import { useState } from "react";
import { BentoCard, CardContent, CardSize } from "@/types/card";
import { Button } from "@/components/ui/Button";
import { X, Check } from "lucide-react";

interface CardEditModalProps {
  card: BentoCard | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCard: BentoCard) => void;
}

const SIZE_PRESETS: { size: CardSize; w: number; h: number; label: string; desc: string }[] = [
  { size: "1x1", w: 1, h: 1, label: "1×1", desc: "Compact Square" },
  { size: "2x1", w: 2, h: 1, label: "2×1", desc: "Wide Horizontal" },
  { size: "1x2", w: 1, h: 2, label: "1×2", desc: "Tall Vertical" },
  { size: "2x2", w: 2, h: 2, label: "2×2", desc: "Large Square" },
];

export function CardEditModal({ card, isOpen, onClose, onSave }: CardEditModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(() =>
    card ? { ...(card.content as Record<string, unknown>) } : {}
  );
  const [currentW, setCurrentW] = useState(card?.layout.w ?? 1);
  const [currentH, setCurrentH] = useState(card?.layout.h ?? 1);

  if (!isOpen || !card) return null;

  const handleSizeChange = (w: number, h: number) => {
    setCurrentW(w);
    setCurrentH(h);
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const finalContent: Record<string, unknown> = { ...formData };

    // Format special field types
    if (card.type === "TECH_STACK" && typeof formData.skills === "string") {
      finalContent.skills = formData.skills
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }

    if (card.type === "PROJECT" && typeof formData.tags === "string") {
      finalContent.tags = formData.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    if (card.type === "GITHUB_STATS") {
      finalContent.stars = Number(formData.stars) || 0;
      finalContent.repos = Number(formData.repos) || 0;
      finalContent.followers = Number(formData.followers) || 0;
      finalContent.contributions = Number(formData.contributions) || 0;
    }

    const updated: BentoCard = {
      ...card,
      layout: {
        ...card.layout,
        w: currentW,
        h: currentH,
      },
      content: finalContent as unknown as CardContent,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-none animate-in fade-in duration-100">
      <div className="relative w-full max-w-lg overflow-hidden rounded-none border-2 border-[var(--border-color)] bg-[var(--bg-card)] shadow-[8px_8px_0px_var(--border-color)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] px-6 py-3.5 bg-[var(--bg-surface)]">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-black bg-[#FFDE59] border border-black px-1.5 py-0.5">
              CONFIG // WIDGET
            </span>
            <h2
              className="text-base font-bold uppercase tracking-tight text-[var(--text-primary)] mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.type.replace("_", " ")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center border-2 border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-color)] hover:bg-[#FF5722] hover:text-white transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-5">
          {/* Size Selector */}
          <div>
            <label className="block font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mb-2">
              GRID_DIMENSIONS // PRESET
            </label>
            <div className="grid grid-cols-4 gap-2">
              {SIZE_PRESETS.map((preset) => {
                const isSelected = currentW === preset.w && currentH === preset.h;
                return (
                  <button
                    key={preset.size}
                    type="button"
                    onClick={() => handleSizeChange(preset.w, preset.h)}
                    className={`flex flex-col items-center justify-center rounded-none p-2 border-2 transition-all cursor-pointer select-none ${
                      isSelected
                        ? "border-[var(--border-color)] bg-[#FFDE59] text-black shadow-[3px_3px_0px_var(--border-color)] translate-x-[-1px] translate-y-[-1px]"
                        : "border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[1.5px_1.5px_0px_var(--border-color)] hover:bg-white"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{preset.label}</span>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] truncate max-w-full">
                      {preset.desc.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-4 space-y-4">
            {/* PROFILE Card Form */}
            {card.type === "PROFILE" && (
              <>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={String(formData.name || "")}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="e.g. Yasir Eka"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Bio / Role
                  </label>
                  <textarea
                    rows={3}
                    value={String(formData.bio || "")}
                    onChange={(e) => handleFieldChange("bio", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none resize-none"
                    placeholder="Short bio describing what you do..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Status
                    </label>
                    <select
                      value={String(formData.status || "open")}
                      onChange={(e) => handleFieldChange("status", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    >
                      <option value="open">Open to Work</option>
                      <option value="busy">Busy</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={String(formData.location || "")}
                      onChange={(e) => handleFieldChange("location", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                      placeholder="e.g. Jakarta, Indonesia"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Avatar Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={String(formData.avatarUrl || "")}
                    onChange={(e) => handleFieldChange("avatarUrl", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </>
            )}

            {/* PROJECT Card Form */}
            {card.type === "PROJECT" && (
              <>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={String(formData.title || "")}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={String(formData.description || "")}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none resize-none"
                    placeholder="What does this project do?"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={String(formData.projectUrl || "")}
                    onChange={(e) => handleFieldChange("projectUrl", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://myproject.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Banner URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={String(formData.bannerUrl || "")}
                    onChange={(e) => handleFieldChange("bannerUrl", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://example.com/banner.png"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Tech Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(formData.tags)
                        ? formData.tags.join(", ")
                        : String(formData.tags || "")
                    }
                    onChange={(e) => handleFieldChange("tags", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="Next.js, TypeScript, Tailwind"
                  />
                </div>
              </>
            )}

            {/* TECH_STACK Card Form */}
            {card.type === "TECH_STACK" && (
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Skills & Tools (comma-separated)
                </label>
                <textarea
                  rows={4}
                  value={
                    Array.isArray(formData.skills)
                      ? formData.skills.join(", ")
                      : String(formData.skills || "")
                  }
                  onChange={(e) => handleFieldChange("skills", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                  placeholder="React, TypeScript, Next.js, Node.js, Tailwind CSS, PostgreSQL, Docker"
                />
                <p className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">
                  Tips: Tech names are auto-highlighted with brand color accents.
                </p>
              </div>
            )}

            {/* GITHUB_STATS Card Form */}
            {card.type === "GITHUB_STATS" && (
              <div className="space-y-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={String(formData.username || "")}
                    onChange={(e) => handleFieldChange("username", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="username"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Stars
                    </label>
                    <input
                      type="number"
                      value={Number(formData.stars) || 0}
                      onChange={(e) => handleFieldChange("stars", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Repositories
                    </label>
                    <input
                      type="number"
                      value={Number(formData.repos) || 0}
                      onChange={(e) => handleFieldChange("repos", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Followers
                    </label>
                    <input
                      type="number"
                      value={Number(formData.followers) || 0}
                      onChange={(e) => handleFieldChange("followers", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Contributions
                    </label>
                    <input
                      type="number"
                      value={Number(formData.contributions) || 0}
                      onChange={(e) => handleFieldChange("contributions", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SOCIAL_LINKS Card Form */}
            {card.type === "SOCIAL_LINKS" && (
              <div className="space-y-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={String(formData.github || "")}
                    onChange={(e) => handleFieldChange("github", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={String(formData.linkedin || "")}
                    onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Twitter / X URL
                  </label>
                  <input
                    type="url"
                    value={String(formData.twitter || "")}
                    onChange={(e) => handleFieldChange("twitter", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://x.com/..."
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={String(formData.email || "")}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="you@domain.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Personal Website
                  </label>
                  <input
                    type="url"
                    value={String(formData.website || "")}
                    onChange={(e) => handleFieldChange("website", e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            )}

            {/* CUSTOM_NOTE Card Form */}
            {card.type === "CUSTOM_NOTE" && (
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Note Text (Markdown)
                </label>
                <textarea
                  rows={4}
                  value={String(formData.markdown || "")}
                  onChange={(e) => handleFieldChange("markdown", e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                  placeholder="**Bold message**, *italic*, or `code`"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            <Check className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
