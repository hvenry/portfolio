import React from "react";
import Image from "next/image";
import { getIconPath } from "@/lib/images";

interface Experience {
  name: string;
  position: string;
  desc: string;
  link: string;
  time: string;
  image: string;
}

interface ExperienceProps {
  info: Experience[];
}

function groupByName(info: Experience[]) {
  const groups: { name: string; entries: Experience[] }[] = [];
  for (const entry of info) {
    const existing = groups.find((group) => group.name === entry.name);
    if (existing) {
      existing.entries.push(entry);
    } else {
      groups.push({ name: entry.name, entries: [entry] });
    }
  }
  return groups;
}

export default function ExperienceCard({ info }: ExperienceProps) {
  return (
    <div className="mx-2 flex flex-col gap-10">
      {groupByName(info).map(({ name, entries }) => (
        <section key={name}>
          <header className="flex items-center gap-3">
            <Image
              src={getIconPath(entries[0].image)}
              alt={name}
              width={128}
              height={128}
              className={`size-8 ${
                entries[0].image === "partisans_icon" ? "icon-invert" : ""
              }`}
              priority
            />
            <a
              href={entries[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-title text-2xl sm:text-3xl"
            >
              {name}
            </a>
            {entries.length > 1 && (
              <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-subtle">
                {entries.length} roles
              </span>
            )}
          </header>
          <ol>
            {entries.map((role, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === entries.length - 1;
              return (
                <li
                  key={`${role.position}-${role.time}`}
                  className="relative pl-11"
                >
                  {/* Timeline branch. The trunk sits at left-4, under the centre of
                      the company icon, and turns square into this role at its
                      vertical centre. The first branch starts level with the role
                      title's centre rather than at the icon, so it begins at the text.
                      Content clears the arm at pl-11, where the company name starts. */}
                  <span
                    aria-hidden
                    className={`absolute bottom-1/2 left-4 w-4 border-b border-l border-foreground/30 ${
                      isFirst ? "top-8" : "top-0"
                    }`}
                  />
                  {/* Trunk carries on to the next role */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-4 top-1/2 w-px bg-foreground/30"
                    />
                  )}
                  <div className="py-4">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <h3 className="font-display text-base font-medium tracking-wide text-foreground sm:text-lg">
                        {role.position}
                      </h3>
                      <p className="whitespace-nowrap text-xs tabular-nums tracking-wide text-subtle">
                        {role.time}
                      </p>
                    </div>
                    <p className="mt-1.5 body-copy">{role.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
