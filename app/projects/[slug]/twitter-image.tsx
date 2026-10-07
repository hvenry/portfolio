import { getAllProjectSlugs } from "@/lib/projects";
import { OG_SIZE } from "@/lib/og";

// X / Twitter uses the same card as Open Graph. Config exports are declared
// here rather than re-exported, because Next reads them statically per file.
export { default } from "./opengraph-image";

export const alt = "Project preview on henryvendittelli.com";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}
