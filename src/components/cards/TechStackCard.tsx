import { TechStackContent } from "@/types/card";
import { cn } from "@/lib/utils";

// Simple icon mapping with color coding
const TECH_COLORS: Record<string, string> = {
  typescript: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  javascript: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
  react: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
  "next.js": "text-[var(--text-primary)] border-white/15 bg-white/5",
  "node.js": "text-green-400 border-green-500/20 bg-green-500/10",
  "tailwind css": "text-teal-400 border-teal-500/20 bg-teal-500/10",
  postgresql: "text-sky-400 border-sky-500/20 bg-sky-500/10",
  prisma: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
  docker: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  figma: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  go: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
  python: "text-yellow-300 border-yellow-400/20 bg-yellow-400/10",
  rust: "text-orange-400 border-orange-500/20 bg-orange-500/10",
};

function getColor(skill: string): string {
  return (
    TECH_COLORS[skill.toLowerCase()] ??
    "text-[var(--text-secondary)] border-[var(--border-color)] bg-white/5"
  );
}

interface TechStackCardProps {
  content: TechStackContent;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
}

export function TechStackCard({ content }: TechStackCardProps) {
  const skills = Array.isArray(content?.skills) ? content.skills : [];

  return (
    <div className="bento-card h-full p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          Tech Stack
        </p>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          {skills.length} skills
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className={cn(
              "inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[11px] tracking-wide font-medium",
              getColor(skill)
            )}
          >
            {skill}
          </span>
        ))}
        {skills.length === 0 && (
          <span className="text-xs font-mono text-[var(--text-muted)]">No skills listed yet</span>
        )}
      </div>
    </div>
  );
}
