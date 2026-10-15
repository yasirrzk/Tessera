import { Layers3 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]">
            <Layers3 className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">
            BentoGrid
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-color)] px-1.5 py-0.5 rounded-sm">
            Maker
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Sign in
          </Button>
          <Button variant="primary" size="sm">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
