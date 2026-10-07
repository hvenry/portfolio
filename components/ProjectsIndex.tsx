"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { PiMagnifyingGlass, PiX } from "react-icons/pi";
import type { ProjectSummary } from "@/lib/projects";
import { buildTechQuery, parseTechFilter } from "@/lib/techFilter";
import { getTechIcon } from "@/components/TechBadge";
import TechBadgeRows from "@/components/TechBadgeRows";
import ProjectCard from "@/components/ProjectCard";

type ProjectsIndexProps = {
  projects: ProjectSummary[];
};

/**
 * Filterable project grid. The `tech` filter lives in the URL so it can be
 * shared. Reading it needs `useSearchParams`, which would otherwise opt the
 * page out of static rendering, so the prerendered HTML shows the unfiltered
 * grid and the URL's filter applies once the page hydrates.
 */
export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  return (
    <Suspense
      fallback={
        <ProjectsIndexContent projects={projects} selectedTech={null} />
      }
    >
      <UrlFilteredProjectsIndex projects={projects} />
    </Suspense>
  );
}

function UrlFilteredProjectsIndex({ projects }: ProjectsIndexProps) {
  const searchParams = useSearchParams();
  const selectedTech = parseTechFilter(searchParams.get("tech"));
  return (
    <ProjectsIndexContent projects={projects} selectedTech={selectedTech} />
  );
}

/** Next.js syncs `useSearchParams` with history updates, without a server round trip */
function replaceTechInUrl(tech: string | null) {
  window.history.replaceState(null, "", `/projects${buildTechQuery(tech)}`);
}

function ProjectsIndexContent({
  projects,
  selectedTech
}: ProjectsIndexProps & { selectedTech: string | null }) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const techCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.technologies) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return counts;
  }, [projects]);

  const allTechs = useMemo(
    () => Array.from(techCounts.keys()).sort((a, b) => a.localeCompare(b)),
    [techCounts]
  );

  const searchedTechs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allTechs;
    return allTechs.filter((tech) => tech.toLowerCase().includes(query));
  }, [allTechs, search]);

  const visibleProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter((project) =>
      project.technologies.includes(selectedTech)
    );
  }, [projects, selectedTech]);

  // Close the dropdown on outside click
  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!searchBoxRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const selectTech = (tech: string) => {
    replaceTechInUrl(tech);
    setSearch("");
    setDropdownOpen(false);
  };

  const toggleTech = (tech: string) => {
    replaceTechInUrl(selectedTech === tech ? null : tech);
  };

  const SelectedIcon = selectedTech ? getTechIcon(selectedTech) : null;

  return (
    <>
      {/* Technology search */}
      <div ref={searchBoxRef} className="relative">
        <div className="flex items-center border border-line bg-background focus-within:border-foreground/60">
          <PiMagnifyingGlass className="ml-4 size-5 shrink-0 text-subtle" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setDropdownOpen(false);
              if (event.key === "Enter" && searchedTechs.length > 0) {
                selectTech(searchedTechs[0]);
              }
            }}
            placeholder="Search technologies to filter projects…"
            aria-label="Search technologies"
            className="w-full bg-transparent px-3 py-3.5 text-base text-foreground placeholder:text-subtle focus:outline-none"
          />
        </div>
        {dropdownOpen && (
          <div className="absolute inset-x-0 top-full z-20 max-h-80 overflow-y-auto border border-t-0 border-line bg-background shadow-[0_16px_48px_0_rgb(0_0_0/0.5)]">
            {searchedTechs.length === 0 ? (
              <p className="px-4 py-3 text-sm text-subtle">
                No technologies match “{search.trim()}”.
              </p>
            ) : (
              searchedTechs.map((tech) => {
                const Icon = getTechIcon(tech);
                const isSelected = selectedTech === tech;
                const count = techCounts.get(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => selectTech(tech)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-foreground/10 ${
                      isSelected
                        ? "bg-foreground text-background hover:bg-foreground"
                        : "text-muted"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="font-medium">{tech}</span>
                    <span
                      className={`ml-auto text-xs tabular-nums ${
                        isSelected ? "text-background/70" : "text-subtle"
                      }`}
                    >
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
      {/* Active filter */}
      <div className="mb-5 mt-3 flex min-h-8 items-center gap-2">
        <span className="text-xs uppercase tracking-[0.15em] text-subtle">
          {selectedTech ? "Filtering by" : "All projects"}
        </span>
        {selectedTech && (
          <span className="inline-flex items-center gap-2 border border-foreground bg-foreground px-2.5 py-1 text-background">
            {SelectedIcon && <SelectedIcon className="size-4" />}
            <span className="text-xs font-medium sm:text-sm">
              {selectedTech}
            </span>
            <button
              type="button"
              aria-label={`Remove ${selectedTech} filter`}
              onClick={() => replaceTechInUrl(null)}
              className="cursor-pointer transition-opacity hover:opacity-60"
            >
              <PiX className="size-4" />
            </button>
          </span>
        )}
        <span className="ml-auto text-xs tabular-nums text-subtle">
          {visibleProjects.length}/{projects.length} projects
        </span>
      </div>
      {visibleProjects.length === 0 ? (
        <div className="border border-line p-8 text-center">
          <p className="text-sm text-subtle">
            No projects match the selected filter.
          </p>
          <button
            type="button"
            onClick={() => replaceTechInUrl(null)}
            className="link mt-3 text-sm"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project}>
              <TechBadgeRows
                technologies={project.technologies}
                selectedTech={selectedTech}
                onToggle={toggleTech}
              />
            </ProjectCard>
          ))}
        </div>
      )}
    </>
  );
}
