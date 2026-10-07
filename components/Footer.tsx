"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/data";
import Socials from "@/components/Socials";

/** Full-viewport pages are sized to fit exactly; the footer would force a scrollbar */
const HIDDEN_ROUTES = ["/rock", "/random", "/reach-out"];

export default function Footer({ force = false }: { force?: boolean }) {
  const pathname = usePathname();
  if (!force && HIDDEN_ROUTES.some((route) => pathname.startsWith(route)))
    return null;

  return (
    <footer
      className={`site-footer mt-16 px-6 pt-8 sm:px-2 ${
        force ? "site-footer-forced" : ""
      }`}
    >
      {/* Socials left, links right at every width. Below sm the wordmark wraps
          onto its own centred line; from sm up the grid puts it between them. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-6 sm:grid sm:grid-cols-3 sm:gap-6">
        <div className="flex gap-2 sm:justify-start">
          <Socials />
        </div>
        <Link
          href="/"
          onClick={() => {
            // Same-route clicks don't navigate, so ScrollToTop never fires
            if (pathname === "/")
              window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="order-last w-full text-center font-display text-base font-medium tracking-wide text-foreground transition-opacity hover:opacity-70 sm:order-none sm:w-auto"
        >
          henryvendittelli.com/
        </Link>
        <div className="flex gap-3 sm:justify-end sm:gap-5">
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet whitespace-nowrap font-display text-xs tracking-wider"
          >
            resume
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="link-quiet whitespace-nowrap font-display text-xs tracking-wider"
          >
            email
          </a>
          <Link
            href="/reach-out"
            className="link-quiet whitespace-nowrap font-display text-xs tracking-wider"
          >
            reach out
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-[10px] uppercase tracking-[0.12em] text-subtle sm:tracking-[0.2em]">
        © {new Date().getFullYear()} Henry Vendittelli · Toronto, Canada
      </p>
    </footer>
  );
}
