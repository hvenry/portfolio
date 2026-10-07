"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import TechBadge from "@/components/TechBadge";

type TechBadgeRowsProps = {
  technologies: string[];
  selectedTech: string | null;
  onToggle: (tech: string) => void;
  /** How many wrapped rows of badges to show before collapsing the rest */
  maxRows?: number;
};

/**
 * Shows the first `maxRows` rows of technology badges and replaces the rest
 * with a `+N` chip.
 *
 * How many badges fit on a row depends on their text and the card's width, so
 * the cut has to be measured rather than counted. The container is clamped to
 * `maxRows` in CSS as well, which keeps the pre-hydration render correct: the
 * server sends every badge, the clamp hides the overflow on the first paint,
 * and hydration only adds the `+N` chip.
 */
export default function TechBadgeRows({
  technologies,
  selectedTech,
  onToggle,
  maxRows = 2
}: TechBadgeRowsProps) {
  const ref = useRef<HTMLDivElement>(null);
  // null means "render every badge", which is both the server render and the
  // state each measurement pass starts from
  const [limit, setLimit] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const chips = Array.from(el.children) as HTMLElement[];
    if (chips.length === 0) return;

    const rowTops: number[] = [];
    for (const chip of chips) {
      const top = chip.offsetTop;
      if (!rowTops.includes(top)) rowTops.push(top);
    }
    if (rowTops.length <= maxRows) {
      setLimit(chips.length);
      return;
    }

    const cutoffTop = rowTops[maxRows];
    const fitting = chips.filter((chip) => chip.offsetTop < cutoffTop).length;
    // The +N chip has to sit on the last visible row, so give up one badge for it
    setLimit(Math.max(1, fitting - 1));
  }, [maxRows]);

  useLayoutEffect(() => {
    if (limit === null) measure();
  }, [limit, measure]);

  // Re-measure from scratch whenever the card resizes or the list changes
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setLimit(null));
    observer.observe(el);
    return () => observer.disconnect();
  }, [technologies]);

  const shown = limit === null ? technologies : technologies.slice(0, limit);
  const hidden = technologies.length - shown.length;

  return (
    <div
      ref={ref}
      // The clamp is what keeps the overflow out of view before hydration
      className="mt-3 flex flex-wrap gap-1.5 overflow-hidden"
      style={{
        maxHeight: `calc(${maxRows} * 1.75rem + ${maxRows - 1} * 0.375rem)`
      }}
    >
      {shown.map((tech) => (
        <TechBadge
          key={tech}
          name={tech}
          size="sm"
          selected={selectedTech === tech}
          onClick={() => onToggle(tech)}
          className="relative z-10"
        />
      ))}
      {hidden > 0 && (
        <span
          aria-label={`${hidden} more technologies`}
          className="inline-flex items-center border border-line px-2 py-1 text-[11px] font-medium text-subtle sm:text-xs"
        >
          +{hidden}
        </span>
      )}
    </div>
  );
}
