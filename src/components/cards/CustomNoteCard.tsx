import { CustomNoteContent } from "@/types/card";
import { cn } from "@/lib/utils";

interface CustomNoteCardProps {
  content: CustomNoteContent;
  size?: "1x1" | "2x1" | "1x2" | "2x2";
}

// Minimal markdown parser (bold, italic, inline code, newlines)
function renderMd(text?: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="font-mono text-[0.9em] bg-white/10 px-1 rounded">$1</code>')
    .replace(/\n/g, "<br />");
}

export function CustomNoteCard({ content }: CustomNoteCardProps) {
  const markdownText = content?.markdown || "Write your note here. Supports **bold** and *italic*.";

  return (
    <div
      className={cn(
        "bento-card h-full p-5 flex items-start",
        content?.bgColor && "border-0"
      )}
      style={content?.bgColor ? { backgroundColor: content.bgColor } : undefined}
    >
      <p
        className="text-sm leading-relaxed text-[var(--text-primary)]"
        dangerouslySetInnerHTML={{ __html: renderMd(markdownText) }}
      />
    </div>
  );
}
