import { cache } from "react";
import { readMarkdownCollection } from "@/lib/content";

type ProjectFrontmatter = {
  title: string;
  bodyTitle: string;
  summary: string;
  technologies: string[];
  github: string;
  youtube: string;
  live: string;
  image: string;
  imageLight: string;
  order: number;
  draft: boolean;
};

export type Project = {
  slug: string;
  title: string;
  bodyTitle: string;
  summary: string;
  technologies: string[];
  github?: string;
  youtube?: string;
  live?: string;
  image?: string;
  imageLight?: string;
  content: string;
  order: number;
  draft?: boolean;
};

/**
 * The fields a project card renders. Client components get this rather than
 * `Project`, whose `content` holds the full markdown body and would bloat the
 * payload.
 */
export type ProjectSummary = Pick<
  Project,
  | "slug"
  | "title"
  | "bodyTitle"
  | "summary"
  | "technologies"
  | "github"
  | "youtube"
  | "live"
  | "image"
  | "imageLight"
>;

export function toProjectSummary({
  slug,
  title,
  bodyTitle,
  summary,
  technologies,
  github,
  youtube,
  live,
  image,
  imageLight
}: Project): ProjectSummary {
  return {
    slug,
    title,
    bodyTitle,
    summary,
    technologies,
    github,
    youtube,
    live,
    image,
    imageLight
  };
}

/** Every visible project, in `order`; cached per request */
export const getAllProjects = cache(function getAllProjects(): Project[] {
  return readMarkdownCollection<ProjectFrontmatter>("projects")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title || "",
      bodyTitle: data.bodyTitle || data.title || "",
      summary: data.summary || "",
      technologies: data.technologies || [],
      github: data.github,
      youtube: data.youtube,
      live: data.live,
      image: data.image,
      imageLight: data.imageLight,
      content,
      order:
        typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
      draft: data.draft === true
    }))
    .sort((a, b) => a.order - b.order);
});

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((project) => project.slug === slug) ?? null;
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}
