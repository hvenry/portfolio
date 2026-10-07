import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseFieldTable } from "@/lib/fieldTable";

export type MarkdownFile<Frontmatter> = {
  slug: string;
  /** Unvalidated frontmatter; every field may be missing */
  data: Partial<Frontmatter> & { draft?: unknown };
  content: string;
};

export type ReadOptions = {
  /**
   * Also read a leading `| Field | Value |` table from the body (see
   * lib/fieldTable.ts). Table fields override frontmatter keys, and the
   * table is removed from `content`.
   */
  fieldTable?: boolean;
};

/**
 * Reads every published markdown file in `content/<collection>`; the filename
 * is the slug. Files starting with `_` (templates) are skipped, and drafts
 * (`draft: true`) are only visible outside production.
 */
export function readMarkdownCollection<Frontmatter>(
  collection: string,
  options: ReadOptions = {}
): MarkdownFile<Frontmatter>[] {
  const directory = path.join(process.cwd(), "content", collection);
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map((fileName): MarkdownFile<Frontmatter> => {
      const fileContents = fs.readFileSync(
        path.join(directory, fileName),
        "utf8"
      );
      const { data, content } = matter(fileContents);
      const slug = fileName.replace(/\.md$/, "");
      if (!options.fieldTable) {
        return {
          slug,
          data: data as MarkdownFile<Frontmatter>["data"],
          content
        };
      }
      const { fields, body } = parseFieldTable(content);
      return {
        slug,
        data: { ...data, ...fields } as MarkdownFile<Frontmatter>["data"],
        content: body
      };
    })
    .filter(
      ({ data }) => data.draft !== true || process.env.NODE_ENV !== "production"
    );
}
