import { GitFork, Link2, X, Mail, Globe, MessageCircle } from "lucide-react";
import { SocialLinksContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface SocialLink {
  key: keyof SocialLinksContent;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { key: "github", label: "GitHub", icon: <GitFork className="h-4 w-4" />, color: "hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]" },
  { key: "linkedin", label: "LinkedIn", icon: <Link2 className="h-4 w-4" />, color: "hover:text-blue-400 hover:border-blue-500/30" },
  { key: "twitter", label: "X / Twitter", icon: <X className="h-4 w-4" />, color: "hover:text-sky-400 hover:border-sky-500/30" },
  { key: "email", label: "Email", icon: <Mail className="h-4 w-4" />, color: "hover:text-emerald-400 hover:border-emerald-500/30" },
  { key: "discord", label: "Discord", icon: <MessageCircle className="h-4 w-4" />, color: "hover:text-indigo-400 hover:border-indigo-500/30" },
  { key: "website", label: "Website", icon: <Globe className="h-4 w-4" />, color: "hover:text-[var(--accent)] hover:border-[var(--accent)]/30" },
];

interface SocialLinksCardProps {
  content: SocialLinksContent;
  size: "1x1" | "2x1" | "1x2" | "2x2";
}

export function SocialLinksCard({ content, size }: SocialLinksCardProps) {
  const availableLinks = SOCIAL_LINKS.filter((l) => content[l.key]);
  const isCompact = size === "1x1";

  return (
    <div className="bento-card h-full p-5 flex flex-col gap-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        Connect
      </p>

      <div className={cn(
        "flex flex-wrap gap-2",
        isCompact && "flex-col"
      )}>
        {availableLinks.map((link) => {
          const href = link.key === "email" ? `mailto:${content[link.key]}` : String(content[link.key]);
          return (
            <a
              key={link.key}
              href={href}
              target={link.key !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-3 py-2",
                "text-[var(--text-secondary)] transition-colors duration-150",
                link.color
              )}
            >
              {link.icon}
              {!isCompact && (
                <span className="text-xs font-medium">{link.label}</span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
