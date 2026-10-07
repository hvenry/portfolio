import Image from "next/image";
import ExperienceCard from "@/components/ExperienceCard";
import ReactMarkdown from "react-markdown";
import { getExperience } from "@/lib/experience";
import { getPageCopy } from "@/lib/pages";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";
import SectionHeading from "@/components/SectionHeading";
import Panel from "@/components/Panel";
import headshot from "@/public/assets/images/headshot.jpeg";
import RockLink from "@/components/RockLink";

export const metadata = {
  title: "Hello! 👋 - henryvendittelli.com",
  description:
    "Welcome to my portfolio! Explore my experience, projects, and hobbies. Let's connect and build something!"
};

function getAge(): number {
  const birthDate = new Date(2003, 2, 5); // March 5, 2003
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function Page() {
  const home = getPageCopy("home-intro");

  return (
    <main className="pt-8 pb-16 sm:pb-24">
      <div className="reveal mx-2">
        <Panel ticks>
          <div className="p-5 sm:p-6">
            <div className="flex flex-row items-start gap-4 sm:gap-5">
              <Image
                src={headshot}
                alt="Henry Vendittelli"
                className="size-28 border border-line p-1"
              />
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-3">
                  <div className="flex items-end gap-2">
                    <RockLink />
                    <h1 className="font-display text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
                      Henry Vendittelli
                    </h1>
                  </div>
                  <p className="text-sm text-subtle sm:text-base">
                    {getAge()} (he/him)
                  </p>
                </div>
                <p className="mt-2 body-copy text-muted">{home.tagline}</p>
              </div>
            </div>
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mt-4 body-copy">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="link">
                    {children}
                  </a>
                )
              }}
            >
              {home.body}
            </ReactMarkdown>
          </div>
        </Panel>
      </div>
      <div className="reveal reveal-1 flex w-full items-center justify-end gap-2 px-2 pt-4">
        <Socials />
      </div>
      <div className="reveal reveal-2">
        <SectionHeading className="mt-8 mb-4">Work Experience</SectionHeading>
        <ExperienceCard info={getExperience("work")} />
      </div>
      <div className="reveal reveal-3">
        <SectionHeading className="mt-12 mb-4">
          Technologies I Build With
        </SectionHeading>
        <Skills />
      </div>
    </main>
  );
}
