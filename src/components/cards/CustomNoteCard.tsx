import { CustomNoteContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface CustomNoteCardProps {
  content: CustomNoteContent;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
}

// Minimal markdown parser (bold with yellow highlight, italic, inline code, newlines)
function renderMd(text?: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="bg-[#FFDE59] text-black px-1 font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="font-mono text-[0.9em] bg-black text-[#25D366] px-1 py-0.5 border border-black dark:border-white font-bold">$1</code>')
    .replace(/\n/g, "<br />");
}

export function CustomNoteCard({ content }: CustomNoteCardProps) {
  const markdownText =
    content?.markdown || "Write your note here. Supports **bold highlighter** and *italic*.";

  return (
    <div
      className={cn(
        "bento-card h-full p-5 flex flex-col justify-between",
        content?.bgColor && "border-2"
      )}
      style={content?.bgColor ? { backgroundColor: content.bgColor } : undefined}
    >
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-dashed border-[var(--border-color)]">
          <p
            className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            NOTE // RAW_LOG
          </p>
          <span className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
            READ_ONLY
          </span>
        </div>

        <p
          className="text-xs sm:text-sm font-mono leading-relaxed text-[var(--text-primary)]"
          dangerouslySetInnerHTML={{ __html: renderMd(markdownText) }}
        />
      </div>

      <div className="mt-3 pt-2 border-t-2 border-dashed border-[var(--border-color)] flex items-center justify-between font-mono text-[9px] uppercase font-bold text-[var(--text-muted)]">
        <span>MEMO_ID: 9021</span>
        <span>STATUS: LOGGED</span>
      </div>
    </div>
  );
}
