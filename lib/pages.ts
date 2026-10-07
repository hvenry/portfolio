import { cache } from "react";
import { readMarkdownCollection } from "@/lib/content";

type PageFrontmatter = {
  tagline: string;
};

/** Hand-written copy for a page: a short tagline plus a markdown body */
export type PageCopy = {
  tagline: string;
  body: string;
};

const getAllPageCopy = cache(function getAllPageCopy(): Map<string, PageCopy> {
  return new Map(
    readMarkdownCollection<PageFrontmatter>("pages", {
      fieldTable: true
    }).map(({ slug, data, content }) => [
      slug,
      { tagline: data.tagline || "", body: content.trim() }
    ])
  );
});

/**
 * Copy from `content/pages/<slug>.md`. Throws when the file is missing so a
 * renamed or deleted page file fails the build instead of rendering blank.
 */
export function getPageCopy(slug: string): PageCopy {
  const copy = getAllPageCopy().get(slug);
  if (!copy) {
    throw new Error(`Missing page copy: content/pages/${slug}.md`);
  }
  return copy;
}
