import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { fitFontSize, truncate } from "@/lib/text";

// Shared frame for generated Open Graph images. The frame, ticks, rule style
// and text match app/opengraph-image.png (the home card), so project cards read
// as the same family: 1px #262626 frame inset 48px, 28px white corner ticks, a
// #666 dashed rule (8px dash, 6px gap), and the content column at x=130..1070.

export const OG_SIZE = { width: 1200, height: 630 };

const FRAME = { inset: 48, tick: 28, line: "#262626" };
const COLUMN = { left: 130, right: 1070 };
const RULE = { left: 129, width: 942, dash: 8, gap: 6 };

export const OG_COLORS = {
  background: "#000000",
  foreground: "#ffffff",
  muted: "#e4e4e7",
  dim: "#a1a1aa"
};

type OgLayout = {
  /** y of the dashed rule */
  ruleTop: number;
  /** Footer text box; Oswald's glyphs start about 0.38em below its top */
  footer: { top: number; size: number };
  /** Box above the rule that `children` fills */
  content: { left: number; top: number; width: number; height: number };
};

const contentBox = (top: number, height: number) => ({
  left: COLUMN.left,
  top,
  width: COLUMN.right - COLUMN.left,
  height
});

export const OG_LAYOUTS = {
  // The home card's own positions: rule at y=446, nav row glyphs at 482-506
  home: {
    ruleTop: 446,
    footer: { top: 472, size: 26 },
    content: contentBox(96, 320)
  },
  // A 48px URL, so it stays legible at link-preview size: glyphs at about
  // 507-552 (30px above the frame's bottom edge), the rule 28px above them,
  // and the preview between the frame's top (+30px) and the rule (-24px)
  project: {
    ruleTop: 479,
    footer: { top: 489, size: 48 },
    content: contentBox(78, 376)
  }
} satisfies Record<string, OgLayout>;

const fontFile = (pkg: string, file: string) =>
  readFile(
    path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file)
  );

/** Oswald and Inter as static woff files (satori cannot read woff2 or variable fonts) */
export async function loadOgFonts() {
  const [oswald600, oswald700, inter400] = await Promise.all([
    fontFile("oswald", "oswald-latin-600-normal.woff"),
    fontFile("oswald", "oswald-latin-700-normal.woff"),
    fontFile("inter", "inter-latin-400-normal.woff")
  ]);
  return [
    {
      name: "Oswald",
      data: oswald600,
      weight: 600 as const,
      style: "normal" as const
    },
    {
      name: "Oswald",
      data: oswald700,
      weight: 700 as const,
      style: "normal" as const
    },
    {
      name: "Inter",
      data: inter400,
      weight: 400 as const,
      style: "normal" as const
    }
  ];
}

function Tick({
  left,
  top,
  width,
  height
}: {
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        background: OG_COLORS.foreground
      }}
    />
  );
}

/** Frame, corner ticks, and dashed rule; `children` fills the area above the rule, `footer` sits below it */
export function OgFrame({
  children,
  footer,
  layout = OG_LAYOUTS.home
}: {
  children: ReactNode;
  footer: ReactNode;
  layout?: OgLayout;
}) {
  const { inset, tick } = FRAME;
  const right = OG_SIZE.width - inset - tick;
  const bottom = OG_SIZE.height - inset - tick;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        background: OG_COLORS.background
      }}
    >
      <div
        style={{
          position: "absolute",
          left: inset,
          top: inset,
          width: OG_SIZE.width - inset * 2,
          height: OG_SIZE.height - inset * 2,
          border: `1px solid ${FRAME.line}`
        }}
      />
      <Tick left={inset} top={inset} width={tick} height={2} />
      <Tick left={inset} top={inset} width={2} height={tick} />
      <Tick left={right} top={inset} width={tick} height={2} />
      <Tick
        left={OG_SIZE.width - inset - 2}
        top={inset}
        width={2}
        height={tick}
      />
      <Tick left={inset} top={bottom} width={2} height={tick} />
      <Tick
        left={inset}
        top={OG_SIZE.height - inset - 2}
        width={tick}
        height={2}
      />
      <Tick
        left={OG_SIZE.width - inset - 2}
        top={bottom}
        width={2}
        height={tick}
      />
      <Tick
        left={right}
        top={OG_SIZE.height - inset - 2}
        width={tick}
        height={2}
      />

      <div
        style={{
          position: "absolute",
          left: layout.content.left,
          top: layout.content.top,
          width: layout.content.width,
          height: layout.content.height,
          display: "flex"
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: "absolute",
          left: RULE.left,
          top: layout.ruleTop,
          width: RULE.width,
          height: 1,
          // A gradient, not one div per dash: satori shrinks fixed-width
          // children of an overflowing flex row
          backgroundImage: `linear-gradient(to right, #666666 ${RULE.dash}px, transparent ${RULE.dash}px)`,
          backgroundSize: `${RULE.dash + RULE.gap}px 1px`,
          backgroundRepeat: "repeat-x"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: COLUMN.left,
          top: layout.footer.top,
          display: "flex",
          fontFamily: "Oswald",
          fontWeight: 600,
          fontSize: layout.footer.size
        }}
      >
        {footer}
      </div>
    </div>
  );
}

/**
 * Footer row for a page card: the domain dimmed, the page's path in white.
 * Oswald 600 averages about 0.43em per glyph, so a long path shrinks below
 * the layout's footer size instead of running past the column.
 */
export function OgUrl({
  path: pagePath,
  layout = OG_LAYOUTS.project
}: {
  path: string;
  layout?: OgLayout;
}) {
  const fontSize = fitFontSize(`henryvendittelli.com${pagePath}`, {
    max: layout.footer.size,
    width: COLUMN.right - COLUMN.left,
    em: 0.43
  });
  return (
    <>
      <div style={{ color: OG_COLORS.dim, fontSize }}>henryvendittelli.com</div>
      <div style={{ color: OG_COLORS.foreground, fontSize }}>{pagePath}</div>
    </>
  );
}

/**
 * Text in place of a preview image: an optional meta line, a title of up to
 * two lines, and a description of up to three, centred in the content box.
 * Inputs are truncated by length because satori has no reliable line clamp.
 */
export function OgText({
  title,
  description,
  meta
}: {
  title: string;
  description?: string;
  meta?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}
    >
      {meta && (
        <div
          style={{
            fontFamily: "Oswald",
            fontWeight: 600,
            fontSize: 28,
            color: OG_COLORS.dim,
            marginBottom: 18
          }}
        >
          {truncate(meta, 60)}
        </div>
      )}
      <div
        style={{
          fontFamily: "Oswald",
          fontWeight: 700,
          fontSize: 84,
          lineHeight: 1.05,
          color: OG_COLORS.foreground
        }}
      >
        {truncate(title, 40)}
      </div>
      {description && (
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 30,
            lineHeight: 1.4,
            color: OG_COLORS.muted,
            marginTop: 24
          }}
        >
          {truncate(description, 150)}
        </div>
      )}
    </div>
  );
}
