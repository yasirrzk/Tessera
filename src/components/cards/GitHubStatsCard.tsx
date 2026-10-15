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
    <div className="flex flex-col justify-between border-2 border-[var(--border-color)] bg-[var(--bg-surface)] p-2.5 shadow-[2px_2px_0px_var(--border-color)]">
      <div className="flex items-center justify-between text-[var(--text-muted)] mb-1">
        <span className="font-mono text-[9px] uppercase font-bold tracking-wider">{label}</span>
        {icon}
      </div>
      <span
        className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-mono leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value?.toLocaleString() ?? "0"}
      </span>
    </div>
  );
}

export function GitHubStatsCard({ content }: GitHubStatsCardProps) {
  const username = content?.username || "developer";
  const stats: Stat[] = [
    { label: "STARS", value: content?.stars ?? 0, icon: <Star className="h-3 w-3" /> },
    { label: "REPOSITORIES", value: content?.repos ?? 0, icon: <GitFork className="h-3 w-3" /> },
    { label: "FOLLOWERS", value: content?.followers ?? 0, icon: <Users className="h-3 w-3" /> },
    { label: "COMMITS_24", value: content?.contributions ?? 0, icon: <Activity className="h-3 w-3" /> },
  ];

  return (
    <div className="bento-card h-full p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-dashed border-[var(--border-color)]">
          <p
            className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            METRICS // GITHUB
          </p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-bold text-black bg-[#FFDE59] border border-black px-1.5 py-0.5 shadow-[1.5px_1.5px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_#000] transition-all"
          >
            @{username}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t-2 border-dashed border-[var(--border-color)] flex items-center justify-between font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
        <span>API // SYNCED</span>
        <span>STATUS: 200 OK</span>
      </div>
    </div>
  );
}
