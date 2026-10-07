import { IconType } from "react-icons";
import { FaGithubSquare, FaYoutube } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";
import type { Project } from "@/lib/projects";

type ProjectLinksProps = {
  project: Pick<Project, "github" | "youtube" | "live">;
  /** Size of each icon, e.g. "size-5" */
  iconClassName: string;
  className?: string;
};

/** Outbound links (GitHub, YouTube, live site) for a project, in that order */
export default function ProjectLinks({
  project,
  iconClassName,
  className = ""
}: ProjectLinksProps) {
  const links: { href?: string; label: string; Icon: IconType }[] = [
    { href: project.github, label: "GitHub", Icon: FaGithubSquare },
    { href: project.youtube, label: "YouTube", Icon: FaYoutube },
    { href: project.live, label: "Live site", Icon: PiGlobeSimple }
  ];

  return links
    .filter((link) => Boolean(link.href))
    .map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`link-quiet ${className}`}
      >
        <Icon className={iconClassName} />
      </a>
    ));
}
