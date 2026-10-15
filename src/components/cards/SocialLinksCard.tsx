import { GitFork, Link2, X, Mail, Globe, MessageCircle } from "lucide-react";
import { SocialLinksContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface SocialLink {
  key: keyof SocialLinksContent;
  label: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  { key: "github", label: "GITHUB", icon: <GitFork className="h-3.5 w-3.5" /> },
  { key: "linkedin", label: "LINKEDIN", icon: <Link2 className="h-3.5 w-3.5" /> },
  { key: "twitter", label: "X_TWITTER", icon: <X className="h-3.5 w-3.5" /> },
  { key: "email", label: "EMAIL", icon: <Mail className="h-3.5 w-3.5" /> },
  { key: "discord", label: "DISCORD", icon: <MessageCircle className="h-3.5 w-3.5" /> },
  { key: "website", label: "WEBSITE", icon: <Globe className="h-3.5 w-3.5" /> },
];

interface SocialLinksCardProps {
  content: SocialLinksContent;
  size: "1x1" | "2x1" | "1x2" | "2x2";
}

export function SocialLinksCard({ content, size }: SocialLinksCardProps) {
  const availableLinks = SOCIAL_LINKS.filter((l) => content && content[l.key]);
  const isCompact = size === "1x1";

  return (
    <div className="bento-card h-full p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-dashed border-[var(--border-color)]">
          <p
            className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            NETWORK // LINKS
          </p>
          <span className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
            SEC: P2P
          </span>
        </div>

        <div className={cn("flex flex-wrap gap-2", isCompact && "flex-col")}>
          {availableLinks.map((link) => {
            const val = content[link.key];
            const href = link.key === "email" ? `mailto:${val}` : String(val);
            return (
              <a
                key={link.key}
                href={href}
                target={link.key !== "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 border-2 border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--border-color)]",
                  "hover:bg-[#FFDE59] hover:text-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--border-color)]",
                  "active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-75"
                )}
              >
                {link.icon}
                {!isCompact && <span>{link.label}</span>}
              </a>
            );
          })}
          {availableLinks.length === 0 && (
            <span className="text-xs font-mono text-[var(--text-muted)]">No links connected</span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t-2 border-dashed border-[var(--border-color)] flex items-center justify-between font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
        <span>GATEWAY: ACTIVE</span>
        <span>SSL: 256</span>
      </div>
    </div>
  );
}
