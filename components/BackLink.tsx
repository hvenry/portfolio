import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";

type BackLinkProps = {
  href: string;
  label: string;
};

/** "< label" link back to a listing page, set beside a detail page's title */
export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="link-quiet flex shrink-0 items-center gap-1 text-xs uppercase tracking-[0.2em]"
    >
      <PiCaretLeft aria-hidden className="size-3.5" />
      {label}
    </Link>
  );
}
