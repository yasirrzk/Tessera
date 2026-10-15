import { ArrowUpRight } from "lucide-react";
import { ProjectContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  content: ProjectContent;
  size: "1x1" | "2x1" | "1x2" | "2x2";
}

export function ProjectCard({ content, size }: ProjectCardProps) {
  const isTall = size === "1x2" || size === "2x2";
  const title = content?.title || "Featured Project";
  const tags = Array.isArray(content?.tags) ? content.tags : [];

  return (
    <div className="bento-card h-full flex flex-col overflow-hidden group">
      {/* Banner */}
      {content?.bannerUrl ? (
        <div className={cn("relative overflow-hidden bg-[var(--bg-surface)]", isTall ? "h-36" : "h-24")}>
          <img
            src={content.bannerUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-card)] border-b border-[var(--border-color)]",
            isTall ? "h-36" : "h-24",
            "flex items-center justify-center"
          )}
        >
          {/* Blueprint watermark */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(var(--border-hover) 1px, transparent 1px), linear-gradient(90deg, var(--border-hover) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest z-10">
            {title}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
            {title}
          </h3>
          {content?.projectUrl && (
            <a
              href={content.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        {isTall && content?.description && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
            {content.description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-0.5 rounded-sm border border-[var(--border-color)] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
