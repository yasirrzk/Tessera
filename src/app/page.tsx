"use client";

import { useState, useCallback, useEffect } from "react";
import { BentoGrid } from "@/components/canvas/BentoGrid";
import { EditorSidebar, ThemePreset } from "@/components/layout/EditorSidebar";
import { Navbar } from "@/components/layout/Navbar";
import { CardEditModal } from "@/components/canvas/CardEditModal";
import { MOCK_CARDS } from "@/data/mock-data";
import { BentoCard, CardType } from "@/types/card";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/Button";
import { RotateCcw, ExternalLink, Sparkles } from "lucide-react";

function createDefaultCard(type: CardType, order: number): BentoCard {
  const defaults: Record<CardType, Omit<BentoCard, "id" | "order">> = {
    PROFILE: {
      type: "PROFILE",
      layout: { x: 0, y: 0, w: 2, h: 2 },
      content: {
        name: "Yasir Eka",
        bio: "Software Engineer crafting elegant interfaces & robust systems. Currently exploring AI-native design.",
        status: "open",
        location: "Jakarta, Indonesia",
      },
    },
    PROJECT: {
      type: "PROJECT",
      layout: { x: 0, y: 0, w: 1, h: 2 },
      content: {
        title: "New Project",
        description: "An innovative digital project built with modern tech.",
        projectUrl: "https://example.com",
        tags: ["Next.js", "TypeScript"],
      },
    },
    TECH_STACK: {
      type: "TECH_STACK",
      layout: { x: 0, y: 0, w: 2, h: 1 },
      content: {
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      },
    },
    GITHUB_STATS: {
      type: "GITHUB_STATS",
      layout: { x: 0, y: 0, w: 2, h: 1 },
      content: {
        username: "yaseru",
        stars: 120,
        repos: 24,
        followers: 180,
        contributions: 950,
      },
    },
    SOCIAL_LINKS: {
      type: "SOCIAL_LINKS",
      layout: { x: 0, y: 0, w: 1, h: 1 },
      content: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        email: "hello@example.com",
      },
    },
    CUSTOM_NOTE: {
      type: "CUSTOM_NOTE",
      layout: { x: 0, y: 0, w: 2, h: 1 },
      content: {
        markdown: "Welcome to my portfolio! Currently available for freelance and full-time inquiries.",
      },
    },
  };

  return { id: nanoid(), order, ...defaults[type] };
}

export default function EditorPage() {
  const [cards, setCards] = useState<BentoCard[]>(MOCK_CARDS);
  const [isPublished, setIsPublished] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [preset, setPreset] = useState<ThemePreset>("velvet");

  // Modal edit state
  const [editingCard, setEditingCard] = useState<BentoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCards = localStorage.getItem("bento_cards");
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
      const savedPublished = localStorage.getItem("bento_published");
      if (savedPublished !== null) {
        setIsPublished(savedPublished === "true");
      }
      const savedPreset = localStorage.getItem("bento_preset") as ThemePreset | null;
      if (savedPreset) {
        setPreset(savedPreset);
      }
    } catch {
      // Ignore localStorage read errors in private browsing
    }
  }, []);

  // Save changes to localStorage
  const saveCardsToStorage = (updatedCards: BentoCard[]) => {
    setCards(updatedCards);
    try {
      localStorage.setItem("bento_cards", JSON.stringify(updatedCards));
    } catch {
      // Ignore
    }
  };

  const handleAddCard = useCallback(
    (type: CardType) => {
      const newCard = createDefaultCard(type, cards.length);
      const updated = [...cards, newCard];
      saveCardsToStorage(updated);
      // Automatically open modal for the new card
      setEditingCard(newCard);
      setIsModalOpen(true);
    },
    [cards]
  );

  const handleReorder = useCallback((reordered: BentoCard[]) => {
    saveCardsToStorage(reordered);
  }, []);

  const handleDeleteCard = useCallback(
    (id: string) => {
      const filtered = cards.filter((c) => c.id !== id);
      saveCardsToStorage(filtered);
    },
    [cards]
  );

  const handleEditCard = useCallback((card: BentoCard) => {
    setEditingCard(card);
    setIsModalOpen(true);
  }, []);

  const handleSaveEditedCard = useCallback(
    (updatedCard: BentoCard) => {
      const updated = cards.map((c) => (c.id === updatedCard.id ? updatedCard : c));
      saveCardsToStorage(updated);
    },
    [cards]
  );

  const handlePublish = useCallback(() => {
    setIsPublished((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("bento_published", String(next));
      } catch {}
      return next;
    });
  }, []);

  const handlePresetChange = useCallback((newPreset: ThemePreset) => {
    setPreset(newPreset);
    try {
      localStorage.setItem("bento_preset", newPreset);
    } catch {}
  }, []);

  const handleResetToDefault = () => {
    if (confirm("Reset layout to default starter template?")) {
      saveCardsToStorage(MOCK_CARDS);
    }
  };

  return (
    <div
      data-preset={preset}
      className="flex flex-col h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-200"
    >
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden in full preview mode if user toggles */}
        {!isPreviewMode && (
          <EditorSidebar
            onAddCard={handleAddCard}
            onPublish={handlePublish}
            isPublished={isPublished}
            isPreviewMode={isPreviewMode}
            onTogglePreview={() => setIsPreviewMode(true)}
            preset={preset}
            onPresetChange={handlePresetChange}
          />
        )}

        {/* Canvas Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {/* Canvas Header / Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                    {isPreviewMode ? "Live Portfolio Preview" : "Canvas Editor"}
                  </h1>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-color)] px-1.5 py-0.5 rounded-sm">
                    {preset}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                  {cards.length} widgets · {isPreviewMode ? "interactive view" : "drag to reorder · click pencil to edit"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isPreviewMode ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsPreviewMode(false)}
                  >
                    Back to Edit Mode
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResetToDefault}
                      className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewMode(true)}
                    >
                      Preview Mode
                    </Button>
                  </>
                )}

                {isPublished && (
                  <a
                    href="/p/yasiru"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-mono text-[11px] text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live URL <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Bento Grid */}
            <BentoGrid
              cards={cards}
              onReorder={handleReorder}
              editable={!isPreviewMode}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />

            {cards.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 border border-dashed border-[var(--border-color)] rounded-2xl text-center">
                <Sparkles className="h-8 w-8 text-[var(--accent)] mb-3 opacity-60" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Your canvas is currently empty
                </h3>
                <p className="text-xs text-[var(--text-muted)] max-w-sm mb-4">
                  Choose a widget from the catalog in the left sidebar to start building your portfolio.
                </p>
                <Button variant="outline" size="sm" onClick={() => handleAddCard("PROFILE")}>
                  Add Profile Widget
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Widget Edit Modal */}
      <CardEditModal
        card={editingCard}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveEditedCard}
      />
    </div>
  );
}
