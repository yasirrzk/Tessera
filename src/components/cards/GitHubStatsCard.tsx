import { Star, GitFork, Users, Activity } from "lucide-react";
import { GitHubStatsContent } from "@/types/card";

interface Stat {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
}

interface GitHubStatsCardProps {
  content: GitHubStatsContent;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
}

function StatBlock({ label, value, icon }: Stat) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
        {value?.toLocaleString() ?? "—"}
      </span>
    </div>
  );
}

export function GitHubStatsCard({ content }: GitHubStatsCardProps) {
  const stats: Stat[] = [
    { label: "Stars", value: content.stars, icon: <Star className="h-3 w-3" /> },
    { label: "Repos", value: content.repos, icon: <GitFork className="h-3 w-3" /> },
    { label: "Followers", value: content.followers, icon: <Users className="h-3 w-3" /> },
    { label: "Commits '24", value: content.contributions, icon: <Activity className="h-3 w-3" /> },
  ];

  return (
    <div className="bento-card h-full p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          GitHub
        </p>
        <a
          href={`https://github.com/${content.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-[var(--accent)] hover:underline"
        >
          @{content.username}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 content-center">
        {stats.map((s) => (
          <StatBlock key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}
