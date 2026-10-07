import { cache } from "react";
import { readMarkdownCollection } from "@/lib/content";

export type ExperienceSection = "work" | "education" | "club";

type ExperienceFrontmatter = {
  section: ExperienceSection;
  organization: string;
  role: string;
  period: string;
  order: number;
  link: string;
  image: string;
  extra: string;
  draft: boolean;
};

/** One role, in the shape `ExperienceCard` renders */
export type Experience = {
  slug: string;
  section: ExperienceSection;
  name: string;
  position: string;
  desc: string;
  link: string;
  image: string;
  /** Display period in brackets, e.g. "[ Sept 2025 - Present ]" */
  time: string;
  extra?: string;
  order: number;
};

/** Every visible experience card, in `order`; cached per request */
const getAllExperience = cache(function getAllExperience(): Experience[] {
  return readMarkdownCollection<ExperienceFrontmatter>("experience", {
    fieldTable: true
  })
    .map(({ slug, data, content }) => ({
      slug,
      section: data.section ?? "work",
      name: data.organization || "",
      position: data.role || "",
      // The card renders one paragraph, so line breaks in the body become spaces
      desc: content.trim().replace(/\s*\n\s*/g, " "),
      link: data.link || "",
      image: data.image || "",
      time: data.period ? `[ ${data.period} ]` : "",
      extra: data.extra,
      order:
        typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER
    }))
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
});

/** Cards for one section of the site (home page work, about page education and clubs) */
export function getExperience(section: ExperienceSection): Experience[] {
  return getAllExperience().filter((entry) => entry.section === section);
}
