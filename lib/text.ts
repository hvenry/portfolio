/**
 * Shortens `text` to at most `max` characters at a word boundary, ending in
 * an ellipsis. Share cards use it because satori has no reliable line clamp.
 */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  // Keep the last word whole when it ends exactly at the cut
  const endsOnWord = clean[max - 1] === " ";
  const space = cut.lastIndexOf(" ");
  const head = endsOnWord || space <= max * 0.6 ? cut : cut.slice(0, space);
  return `${head.replace(/[\s,;:.-]+$/, "")}…`;
}

/**
 * Largest font size, up to `max`, at which `text` fits in `width` pixels,
 * given the font's average glyph width as a fraction of its size (`em`).
 * Satori cannot shrink text to fit, so share cards size long text up front.
 */
export function fitFontSize(
  text: string,
  { max, width, em }: { max: number; width: number; em: number }
): number {
  return Math.min(max, Math.floor(width / (Math.max(text.length, 1) * em)));
}
