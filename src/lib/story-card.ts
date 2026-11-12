// Pure helpers for the yearbook Story card (1080 × 1920 PNG drawn on a canvas).
export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;
export type StoryTone = "dark" | "light";

export function storyFilename(studentId: string, tone: StoryTone) {
  return `kenangan-${studentId}-2026-${tone === "dark" ? "biru-malam" : "kertas-putih"}.png`;
}

/** Splits text into lines that fit maxWidth; the last allowed line ends with "…" when text is cut. */
export function wrapLines(text: string, maxWidth: number, measure: (s: string) => number, maxLines: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  let i = 0;
  for (; i < words.length; i++) {
    const next = current ? `${current} ${words[i]}` : words[i]!;
    if (measure(next) <= maxWidth || !current) { current = next; continue; }
    lines.push(current);
    current = words[i]!;
    if (lines.length === maxLines) break;
  }
  if (lines.length < maxLines && current) { lines.push(current); current = ""; i = words.length; }
  if (i < words.length || (lines.length === maxLines && current && lines[lines.length - 1] !== current)) {
    let last = lines[maxLines - 1] ?? "";
    while (last && measure(`${last}…`) > maxWidth) last = last.split(" ").slice(0, -1).join(" ");
    lines[maxLines - 1] = `${last}…`;
  }
  return lines;
}

/** Source rectangle that fills dst like CSS object-fit: cover; focusY 0 = top, 1 = bottom. */
export function coverCrop(srcW: number, srcH: number, dstW: number, dstH: number, focusY = 0.5) {
  const scale = Math.max(dstW / srcW, dstH / srcH);
  const sw = dstW / scale;
  const sh = dstH / scale;
  return { sx: (srcW - sw) / 2, sy: (srcH - sh) * Math.min(1, Math.max(0, focusY)), sw, sh };
}
