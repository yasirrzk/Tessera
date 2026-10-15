import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "danger" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold tracking-tight select-none cursor-pointer rounded-sm border-2 border-[var(--border-color)] transition-all duration-75 uppercase font-mono",
          // Variants
          variant === "primary" && [
            "bg-[#FFDE59] text-black shadow-[3px_3px_0px_var(--border-color)]",
            "hover:bg-[#E5C74F] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_var(--border-color)]",
            "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ],
          variant === "outline" && [
            "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-[3px_3px_0px_var(--border-color)]",
            "hover:bg-[var(--bg-surface)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_var(--border-color)]",
            "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ],
          variant === "secondary" && [
            "bg-[#25D366] text-black shadow-[3px_3px_0px_var(--border-color)]",
            "hover:bg-[#1EBE5D] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_var(--border-color)]",
            "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ],
          variant === "danger" && [
            "bg-[#FF5722] text-white shadow-[3px_3px_0px_var(--border-color)]",
            "hover:bg-[#E64A19] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_var(--border-color)]",
            "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ],
          variant === "ghost" && [
            "border-transparent bg-transparent text-[var(--text-secondary)] shadow-none",
            "hover:border-[var(--border-color)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] hover:shadow-[2px_2px_0px_var(--border-color)]",
            "active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
          ],
          // Sizes
          size === "sm" && "text-xs px-2.5 py-1 gap-1.5",
          size === "md" && "text-xs px-3.5 py-1.5 gap-2",
          size === "lg" && "text-sm px-5 py-2 gap-2.5",
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
