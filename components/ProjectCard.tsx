import React from "react";
import Link from "next/link";
import type { ProjectSummary } from "@/lib/projects";
import Panel from "@/components/Panel";
import ProjectImage from "@/components/ProjectImage";
import ProjectLinks from "@/components/ProjectLinks";

type ProjectCardProps = {
  project: ProjectSummary;
  className?: string;
  /** Rendered under the summary, e.g. the technology badges */
  children?: React.ReactNode;
};

/** Project tile on the projects index */
export default function ProjectCard({
  project,
  className = "",
  children
}: ProjectCardProps) {
  return (
    <Panel
      interactive
      className={`panel-ticks-hover flex flex-col ${className}`}
    >
      {/* Whole-card click target; interactive children sit above it at z-10 */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} writeup`}
        className="absolute inset-0"
      />
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <span className="font-display text-lg font-medium tracking-wide text-foreground sm:text-xl">
          {project.title}
        </span>
        <div className="flex items-center gap-2">
          <ProjectLinks
            project={project}
            iconClassName="size-5"
            className="relative z-10"
          />
        </div>
      </div>
      {project.image && (
        <ProjectImage
          image={project.image}
          imageLight={project.imageLight}
          alt={project.title}
          className="aspect-[1200/630] w-full border-b border-line bg-background object-contain"
        />
      )}
      <div className="flex flex-1 flex-col px-4 py-3">
        <p className="text-base font-medium text-foreground">
          {project.bodyTitle}
        </p>
        <p className="mt-1 line-clamp-4 text-base leading-relaxed text-subtle">
          {project.summary}
        </p>
        {children}
      </div>
    </Panel>
  );
}
