import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { buildTechQuery } from "@/lib/techFilter";
import TechBadge from "@/components/TechBadge";
import BlogContent from "@/components/BlogContent";
import ProjectImage from "@/components/ProjectImage";
import ProjectLinks from "@/components/ProjectLinks";
import BackLink from "@/components/BackLink";

type Params = Promise<{ slug: string }>;

// Every project is known at build time; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  // Without its own openGraph and twitter blocks a project inherits the home
  // page's, so a shared link would show the home title and URL
  const title = `${project.bodyTitle} - henryvendittelli.com`;
  return {
    title: `${project.title} Project - henryvendittelli.com`,
    description: project.summary,
    openGraph: {
      type: "article",
      siteName: "henryvendittelli.com",
      title,
      description: project.summary,
      url: `/projects/${slug}`
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary
    }
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full px-2 pb-16 sm:pb-24">
      <div className="flex items-center justify-between gap-4 md:w-4/5">
        <div className="flex items-end gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-wide text-foreground sm:text-3xl">
            {project.bodyTitle}
          </h1>
          <ProjectLinks project={project} iconClassName="size-6 sm:size-7" />
        </div>
        <BackLink href="/projects" label="projects" />
      </div>
      {project.image && (
        <ProjectImage
          image={project.image}
          imageLight={project.imageLight}
          alt={project.title}
          className="mt-6 h-auto w-full border border-line md:w-4/5"
          priority
        />
      )}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <TechBadge
            key={tech}
            name={tech}
            size="sm"
            href={`/projects${buildTechQuery(tech)}`}
          />
        ))}
      </div>
      <div className="mt-6">
        <BlogContent content={project.content} />
      </div>
    </main>
  );
}
