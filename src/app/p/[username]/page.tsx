import { MOCK_USER } from "@/data/mock-data";
import { PublicBentoView } from "@/components/canvas/PublicBentoView";
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
    title: `${user.name} — @${username} · BentoGrid Neo-Brutalist`,
    description: user.bio ?? `Check out ${user.name}'s modular bento portfolio.`,
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
        <div className="border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-8 shadow-[6px_6px_0px_var(--border-color)] text-center max-w-sm">
          <p className="font-mono text-[10px] uppercase font-bold text-white bg-[#FF5722] px-2 py-0.5 inline-block mb-3 border border-black">
            ERROR 404 // NOT PUBLISHED
          </p>
          <h1
            className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            @{username}
          </h1>
          <p className="text-xs font-mono text-[var(--text-secondary)] mb-4">
            THIS PORTFOLIO HAS NOT BEEN BROADCASTED TO LIVE NETWORK YET.
          </p>
          <Link
            href="/"
            className="inline-block border-2 border-black bg-[#FFDE59] text-black font-mono text-xs font-bold uppercase px-4 py-2 shadow-[2px_2px_0px_#000] hover:bg-[#E5C74F]"
          >
            CREATE YOUR OWN BENTO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Topbar */}
      <header className="border-b-2 border-[var(--border-color)] bg-[var(--background)]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center border-2 border-[var(--border-color)] bg-[#FFDE59] text-black shadow-[2px_2px_0px_var(--border-color)]">
              <Layers3 className="h-3.5 w-3.5" />
            </div>
            <span className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase">
              @{username} {"//"} LIVE_PROFILE
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 border-2 border-[var(--border-color)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-[10px] uppercase font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-color)] hover:bg-[#FFDE59] hover:text-black transition-all"
          >
            <span>BUILT WITH BENTOGRID</span>
          </Link>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <PublicBentoView
          initialCards={user.cards}
        />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[var(--border-color)] mt-12 bg-[var(--bg-surface)]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <p className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)]">
            POWERED BY{" "}
            <Link href="/" className="text-[var(--text-primary)] hover:bg-[#FFDE59] px-1 py-0.5 border border-black text-black bg-[#FFDE59]">
              BENTOGRID MAKER
            </Link>
          </p>
          <span className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
            SYS: STABLE // BRUTAL_GRID
          </span>
        </div>
      </footer>
    </div>
  );
}
