import { MOCK_USER } from "@/data/mock-data";
import { PublicBentoView } from "@/components/canvas/PublicBentoView";
import { ThemePreset } from "@/components/layout/EditorSidebar";
import { Layers3 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Allow blocking prerender for dynamic username param (Next.js 16)
export const instant = false;

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PublicProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const user = MOCK_USER;

  return {
    title: `${user.name} — @${username} · BentoGrid`,
    description: user.bio ?? `Check out ${user.name}'s portfolio on BentoGrid Maker.`,
    openGraph: {
      title: `${user.name} (@${username})`,
      description: user.bio ?? "",
      type: "profile",
    },
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  // In real app: fetch from DB and verify isPublished
  const user = MOCK_USER;

  if (!user.isPublished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-[var(--background)]">
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-3">
            404 · Not Found
          </p>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            @{username}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            This portfolio hasn&apos;t been published yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Minimal topbar */}
      <header className="border-b border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--text-muted)]">
              @{username}
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <span>Built with BentoGrid</span>
          </Link>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <PublicBentoView
          initialCards={user.cards}
          initialPreset={user.themeConfig.preset as ThemePreset}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] mt-12">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            Made with{" "}
            <Link href="/" className="text-[var(--accent)] hover:underline">
              BentoGrid Maker
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
