import { cache } from "react";
import { readMarkdownCollection } from "@/lib/content";

type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags?: string[];
  draft?: boolean;
};

/** Every visible post, newest first; cached per request */
export const getAllPosts = cache(function getAllPosts(): Post[] {
  return readMarkdownCollection<PostFrontmatter>("blog")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      content,
      tags: data.tags || [],
      draft: data.draft === true
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
