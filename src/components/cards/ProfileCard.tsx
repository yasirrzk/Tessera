import { MapPin } from "lucide-react";
import { ProfileContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  content: ProfileContent;
  size: "1x1" | "2x1" | "1x2" | "2x2";
}

const statusConfig = {
  open: { label: "SYS_STATUS // AVAILABLE", color: "text-black", bg: "bg-[#25D366] border-black" },
  busy: { label: "SYS_STATUS // BUSY", color: "text-white", bg: "bg-[#FF5722] border-black" },
  custom: { label: "STATUS // CUSTOM", color: "text-black", bg: "bg-[#FFDE59] border-black" },
};

export function ProfileCard({ content, size }: ProfileCardProps) {
  const isBig = size === "2x2";
  const statusKey = content?.status && statusConfig[content.status] ? content.status : "open";
  const status = statusConfig[statusKey];
  const displayName = content?.name || "YOUR NAME";

  return (
    <div className={cn("bento-card h-full p-5 flex flex-col justify-between", isBig && "p-6")}>
      <div>
        {/* Avatar + Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={cn(
              "rounded-none overflow-hidden bg-[#FFDE59] border-2 border-[var(--border-color)] shadow-[2px_2px_0px_var(--border-color)] shrink-0 flex items-center justify-center font-bold font-mono",
              isBig ? "h-16 w-16 text-2xl text-black" : "h-11 w-11 text-lg text-black"
            )}
          >
            {content?.avatarUrl ? (
              <img src={content.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              <span>{displayName[0]?.toUpperCase()}</span>
            )}
          </div>

          {/* Status badge */}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-none border-2 px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider shadow-[2px_2px_0px_var(--border-color)]",
              status.bg,
              status.color
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {content?.status === "custom" ? content?.statusText || "ACTIVE" : status.label}
          </span>
        </div>

        {/* Name (Heading Grotesk Uppercase) */}
        <h2
          className={cn(
            "font-bold uppercase tracking-tight text-[var(--text-primary)] leading-none mb-2",
            isBig ? "text-2xl sm:text-3xl" : "text-xl"
          )}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {displayName}
        </h2>

        {/* Bio */}
        {content?.bio && (
          <p
            className={cn(
              "text-[var(--text-secondary)] font-medium leading-relaxed",
              isBig ? "text-sm" : "text-xs line-clamp-3"
            )}
          >
            {content.bio}
          </p>
        )}
      </div>

      {/* Location / Technical coordinates footer */}
      <div className="mt-4 pt-3 border-t-2 border-dashed border-[var(--border-color)] flex items-center justify-between">
        {content?.location ? (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-[var(--text-muted)] shrink-0" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
              LOC: {content.location}
            </span>
          </div>
        ) : (
          <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)]">
            [SEC_01] // VERIFIED
          </span>
        )}
        <span className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
          MOD: BIO
        </span>
      </div>
    </div>
  );
}
