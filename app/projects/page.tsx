import { getAllProjects, toProjectSummary } from "@/lib/projects";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata = {
  title: "Projects - henryvendittelli.com",
  description: "Explore various projects by Henry Vendittelli."
};

export default function ProjectsPage() {
  const projects = getAllProjects().map(toProjectSummary);

  return (
    <main className="pt-8 pb-16 sm:pb-24 px-2">
      <ProjectsIndex projects={projects} />
    </main>
  );
}
