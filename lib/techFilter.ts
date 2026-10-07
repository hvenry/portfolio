/**
 * Reads the `tech` query param. Older links may carry a comma-separated list,
 * so only the first entry is honoured.
 */
export function parseTechFilter(tech: string | null): string | null {
  if (!tech) return null;
  return tech.split(",").filter(Boolean)[0] ?? null;
}

export function buildTechQuery(tech: string | null): string {
  if (!tech) return "";
  return `?${new URLSearchParams({ tech }).toString()}`;
}
