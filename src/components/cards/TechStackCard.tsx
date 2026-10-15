import { TechStackContent } from "@/types/card";
import { cn } from "@/lib/utils";

const TECH_BRUTALIST_COLORS: Record<string, string> = {
  typescript: "bg-[#FFDE59] text-black",
  javascript: "bg-[#FFDE59] text-black",
  react: "bg-[#00D8FF] text-black",
  "next.js": "bg-black text-white dark:bg-white dark:text-black",
  "node.js": "bg-[#25D366] text-black",
  "tailwind css": "bg-[#06B6D4] text-black",
  postgresql: "bg-[#336791] text-white",
  prisma: "bg-[#2D3748] text-white",
  docker: "bg-[#2496ED] text-white",
  figma: "bg-[#FF5722] text-white",
  go: "bg-[#00ADD8] text-black",
  python: "bg-[#FFDE59] text-black",
  rust: "bg-[#FF5722] text-white",
};

function getBrutalistColor(skill: string): string {
  return (
    TECH_BRUTALIST_COLORS[skill.toLowerCase()] ??
    "bg-[var(--bg-surface)] text-[var(--text-primary)]"
  );
}

interface TechStackCardProps {
  content: TechStackContent;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
}

export function TechStackCard({ content }: TechStackCardProps) {
  const skills = Array.isArray(content?.skills) ? content.skills : [];

  return (
    <div className="bento-card h-full p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-dashed border-[var(--border-color)]">
          <p
            className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TECH_STACK // MODULE
          </p>
          <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-color)] px-1.5 py-0.5 shadow-[1px_1px_0px_var(--border-color)]">
            QTY: {skills.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className={cn(
                "inline-flex items-center rounded-none border-2 border-[var(--border-color)] px-2.5 py-1 font-mono text-[10px] uppercase font-bold tracking-wider shadow-[2px_2px_0px_var(--border-color)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_var(--border-color)] transition-all cursor-default select-none",
                getBrutalistColor(skill)
              )}
            >
              {skill}
            </span>
          ))}
          {skills.length === 0 && (
            <span className="text-xs font-mono text-[var(--text-muted)]">No skills listed</span>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t-2 border-dashed border-[var(--border-color)] flex items-center justify-between font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
        <span>CORE // COMPATIBLE</span>
        <span>VER: 2026.1</span>
      </div>
    </div>
  );
}
