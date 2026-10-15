import { ArrowUpRight } from "lucide-react";
import { ProjectContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  content: ProjectContent;
  size: "1x1" | "2x1" | "1x2" | "2x2";
}

export function ProjectCard({ content, size }: ProjectCardProps) {
  const isTall = size === "1x2" || size === "2x2";
  const title = content?.title || "PROJECT SHOWCASE";
  const tags = Array.isArray(content?.tags) ? content.tags : [];

  return (
    <div className="bento-card h-full flex flex-col overflow-hidden group">
      {/* Banner */}
      {content?.bannerUrl ? (
        <div
          className={cn(
            "relative overflow-hidden bg-[var(--bg-surface)] border-b-2 border-[var(--border-color)]",
            isTall ? "h-36" : "h-24"
          )}
        >
          <img
            src={content.bannerUrl}
            alt={title}
            className="h-full w-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-200"
          />
        </div>
      ) : (
        <div
          className={cn(
            "relative overflow-hidden bg-[var(--bg-surface)] border-b-2 border-[var(--border-color)]",
            isTall ? "h-32" : "h-20",
            "flex items-center justify-between px-4"
          )}
        >
          <div className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
            ARCHIVE // 01
          </div>
          <div className="h-6 w-6 border-2 border-[var(--border-color)] bg-[#FFDE59] flex items-center justify-center font-mono text-xs font-bold text-black shadow-[2px_2px_0px_var(--border-color)]">
            ↗
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              className="text-base font-bold uppercase tracking-tight text-[var(--text-primary)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h3>
            {content?.projectUrl && (
              <a
                href={content.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-1 border-2 border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[#FFDE59] hover:text-black shadow-[2px_2px_0px_var(--border-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {isTall && content?.description && (
            <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-3">
              {content.description}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="mt-3 pt-2 border-t-2 border-dashed border-[var(--border-color)] flex flex-wrap gap-1.5 items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center border border-[var(--border-color)] bg-[#FFDE59] px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold text-black shadow-[1px_1px_0px_var(--border-color)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
            TYPE: DEV
          </span>
        </div>
      </div>
    </div>
  );
}
