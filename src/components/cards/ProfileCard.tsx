import { MapPin, CheckCircle2 } from "lucide-react";
import { ProfileContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  content: ProfileContent;
  size: "1x1" | "2x1" | "1x2" | "2x2";
}

const statusConfig = {
  open: { label: "Open to Work", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  busy: { label: "Busy", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  custom: { label: "", color: "text-[var(--text-secondary)]", bg: "bg-white/5 border-white/10" },
};

export function ProfileCard({ content, size }: ProfileCardProps) {
  const isBig = size === "2x2";
  const statusKey = content?.status && statusConfig[content.status] ? content.status : "open";
  const status = statusConfig[statusKey];
  const displayName = content?.name || "Your Name";

  return (
    <div className={cn("bento-card h-full p-5 flex flex-col", isBig && "p-6")}>
      {/* Avatar + Status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className={cn(
            "rounded-xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)] shrink-0 flex items-center justify-center",
            isBig ? "h-16 w-16" : "h-10 w-10"
          )}
        >
          {content?.avatarUrl ? (
            <img src={content.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <span
              className={cn(
                "font-semibold text-[var(--text-secondary)]",
                isBig ? "text-2xl" : "text-base"
              )}
            >
              {displayName[0]?.toUpperCase()}
            </span>
          )}
        </div>

        {/* Status badge */}
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
            status.bg,
            status.color
          )}
        >
          <CheckCircle2 className="h-2.5 w-2.5" />
          {content?.status === "custom" ? content?.statusText || "Active" : status.label}
        </span>
      </div>

      {/* Name */}
      <h2
        className={cn(
          "font-semibold tracking-tight text-[var(--text-primary)] leading-tight",
          isBig ? "text-2xl" : "text-lg"
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {displayName}
      </h2>

      {/* Bio */}
      {content?.bio && (
        <p
          className={cn(
            "mt-1.5 text-[var(--text-secondary)] leading-relaxed flex-1",
            isBig ? "text-sm" : "text-xs line-clamp-2"
          )}
        >
          {content.bio}
        </p>
      )}

      {/* Location */}
      {content?.location && (
        <div className="mt-3 flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-[var(--text-muted)] shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            {content.location}
          </span>
        </div>
      )}
    </div>
  );
}
