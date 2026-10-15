"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ content, children, placement = "top", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-xs rounded bg-[#0d0f12] border border-white/10 text-[var(--text-primary)] whitespace-nowrap pointer-events-none",
            "shadow-xl",
            placement === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
            placement === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-1.5",
            placement === "left" && "right-full top-1/2 -translate-y-1/2 mr-1.5",
            placement === "right" && "left-full top-1/2 -translate-y-1/2 ml-1.5",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
