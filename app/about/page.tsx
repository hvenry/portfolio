import { PiInfo } from "react-icons/pi";
import { getExperience } from "@/lib/experience";
import ExperienceCard from "@/components/ExperienceCard";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "About Me - henryvendittelli.com",
  description: "More about Henry, including education and involvement in clubs."
};

export default function Page() {
  return (
    <main className="pt-8 pb-16 sm:pb-24">
      <PageHeader
        icon={<PiInfo size={26} />}
        title="More About Me"
        description="Some information about my formal education in computer science and my involvement in clubs."
      />
      <SectionHeading className="mt-10 mb-4">Education</SectionHeading>
      <ExperienceCard info={getExperience("education")} />
      <SectionHeading className="mt-8 mb-4">Club Involvement</SectionHeading>
      <ExperienceCard info={getExperience("club")} />
    </main>
  );
}
