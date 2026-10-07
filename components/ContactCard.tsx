import { contact } from "@/data";

export default function ContactCard() {
  return (
    <div className="group relative flex justify-center items-center">
      <div className="panel-ticks glow relative border border-line bg-background">
        <div className="border-b border-line px-6 py-4">
          <p className="font-display text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
            Contact Me
          </p>
        </div>
        <div className="flex flex-col gap-3 px-6 py-5 text-sm text-muted sm:text-base">
          <div className="flex justify-between gap-10 sm:gap-16">
            <p className="text-subtle">Email</p>
            <a href={`mailto:${contact.email}`} className="link">
              {contact.email}
            </a>
          </div>
          <div className="flex justify-between gap-10 sm:gap-16">
            <p className="text-subtle">Phone</p>
            <p>{contact.phone}</p>
          </div>
          <div className="flex justify-between gap-10 sm:gap-16">
            <p className="text-subtle">More Info</p>
            <a
              className="link"
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-60px] text-3xl opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        😎
      </div>
    </div>
  );
}
