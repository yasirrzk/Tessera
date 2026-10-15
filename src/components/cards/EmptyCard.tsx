import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyCardProps {
  onClick?: () => void;
  className?: string;
}

export function EmptyCard({ onClick, className }: EmptyCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bento-card h-full w-full flex flex-col items-center justify-center gap-2",
        "border-dashed border-[var(--border-color)] hover:border-[var(--border-hover)]",
        "transition-colors duration-200 cursor-pointer group",
        className
      )}
    >
      {/* Blueprint crosshair watermark */}
      <div
        className="absolute inset-4 opacity-5"
        style={{
          backgroundImage: `linear-gradient(var(--border-hover) 1px, transparent 1px), linear-gradient(90deg, var(--border-hover) 1px, transparent 1px)`,
          backgroundSize: "16px 16px"
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-[var(--border-color)] group-hover:border-[var(--border-hover)] transition-colors">
          <Plus className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Add widget
        </span>
      </div>
    </button>
  );
}
