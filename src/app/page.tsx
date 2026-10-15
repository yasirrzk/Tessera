"use client";

import { useState, useCallback, useEffect } from "react";
import { BentoGrid } from "@/components/canvas/BentoGrid";
import { EditorSidebar } from "@/components/layout/EditorSidebar";
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

  const handleResetToDefault = () => {
    if (confirm("Reset layout to default starter template?")) {
      saveCardsToStorage(MOCK_CARDS);
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-150"
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
          />
        )}

        {/* Canvas Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {/* Canvas Header / Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[var(--border-color)] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className="text-lg font-bold uppercase tracking-tight text-[var(--text-primary)] leading-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {isPreviewMode ? "PREVIEW // PORTFOLIO_LIVE" : "CANVAS // MODULAR_GRID"}
                  </h1>
                  <span className="font-mono text-[9px] uppercase font-bold text-black bg-[#FFDE59] border border-black px-1.5 py-0.5 shadow-[1.5px_1.5px_0px_#000]">
                    BRUTAL_GRID
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  MODULES: {cards.length} · COLS: 4 · {isPreviewMode ? "INTERACTIVE_VIEW" : "DRAG_TO_REORDER // CLICK PENCIL TO EDIT"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isPreviewMode ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsPreviewMode(false)}
                  >
                    RETURN TO EDIT
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetToDefault}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" /> RESET
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewMode(true)}
                    >
                      PREVIEW MODE
                    </Button>
                  </>
                )}

                {isPublished && (
                  <a
                    href="/p/yasiru"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#25D366] px-3 py-1 font-mono text-[11px] font-bold text-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
                    LIVE URL <ExternalLink className="h-3 w-3" />
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
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] text-center">
                <Sparkles className="h-8 w-8 text-[#FFDE59] mb-3" />
                <h3
                  className="text-base font-bold uppercase tracking-tight text-[var(--text-primary)] mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  CANVAS // EMPTY_WORKSPACE
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] max-w-sm mb-4">
                  SELECT A WIDGET FROM THE LEFT CATALOG TO INITIALIZE YOUR NEO-BRUTALIST BENTO GRID.
                </p>
                <Button variant="primary" size="sm" onClick={() => handleAddCard("PROFILE")}>
                  ADD PROFILE CARD
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
