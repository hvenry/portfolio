import React from "react";
import { IconType } from "react-icons";
import { PiCode, PiStack, PiDatabase, PiWrench } from "react-icons/pi";
import { buildTechQuery } from "@/lib/techFilter";
import TechBadge from "@/components/TechBadge";

const skillCategories: { title: string; Icon: IconType; skills: string[] }[] = [
  {
    title: "Languages",
    Icon: PiCode,
    skills: [
      "Python",
      "Bash",
      "Lua",
      "Java",
      "C",
      "Rust",
      "TypeScript",
      "JavaScript"
    ]
  },
  {
    title: "Frameworks",
    Icon: PiStack,
    skills: [
      "React",
      "Next.js",
      "Express.js",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "FastAPI",
      "Gunicorn",
      "OpenCV",
      "PyTorch"
    ]
  },
  {
    title: "Databases",
    Icon: PiDatabase,
    skills: ["MySQL", "Redis", "PostgreSQL", "MongoDB", "SQLite", "Firebase"]
  },
  {
    title: "Tools",
    Icon: PiWrench,
    skills: [
      "Git",
      "GCP",
      "AWS",
      "Auth0",
      "Vim",
      "Vite",
      "Node.js",
      "GraphQL",
      "Postman",
      "Terraform",
      "GitHub Actions"
    ]
  }
];

const Skills = () => {
  return (
    <div className="mx-2 flex flex-col gap-6">
      {skillCategories.map(({ title, Icon, skills }) => (
        // Label sits above the badges on mobile and beside them from sm up
        <div key={title} className="sm:flex sm:items-start sm:gap-5">
          <p className="mb-2 flex shrink-0 items-center gap-2 font-display text-base font-medium tracking-wide text-muted sm:mb-0 sm:w-32 sm:pt-1.5">
            <Icon className="size-4 shrink-0 text-subtle" />
            {title}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <TechBadge
                key={skill}
                name={skill}
                href={`/projects${buildTechQuery(skill)}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
