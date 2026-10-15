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
        "inline-flex items-center font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none border border-[var(--border-color)] shadow-[1.5px_1.5px_0px_var(--border-color)]",
        variant === "default" &&
          "bg-[var(--bg-surface)] text-[var(--text-primary)]",
        variant === "accent" &&
          "bg-[#FFDE59] text-black",
        variant === "success" &&
          "bg-[#25D366] text-black",
        variant === "warning" &&
          "bg-[#FF5722] text-white",
        variant === "muted" &&
          "bg-transparent text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
