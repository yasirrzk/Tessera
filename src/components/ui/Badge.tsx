import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium",
        variant === "default" &&
          "bg-white/5 text-[var(--text-secondary)] border border-[var(--border-color)]",
        variant === "accent" &&
          "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
        variant === "success" &&
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        variant === "warning" &&
          "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        variant === "muted" &&
          "bg-transparent text-[var(--text-muted)] border border-[var(--border-color)]",
        className
      )}
    >
      {children}
    </span>
  );
}
