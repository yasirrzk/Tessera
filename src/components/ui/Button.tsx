import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none",
          // variants
          variant === "primary" && [
            "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
            "rounded-lg shadow-sm",
          ],
          variant === "ghost" && [
            "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5",
            "rounded-lg",
          ],
          variant === "outline" && [
            "border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-hover)]",
            "bg-transparent rounded-lg",
          ],
          variant === "danger" && [
            "text-red-400 hover:text-red-300 hover:bg-red-500/10",
            "rounded-lg",
          ],
          // sizes
          size === "sm" && "text-xs px-2.5 py-1.5 gap-1.5",
          size === "md" && "text-sm px-3.5 py-2 gap-2",
          size === "lg" && "text-base px-5 py-2.5 gap-2",
          size === "icon" && "h-8 w-8 p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
