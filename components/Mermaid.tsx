"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Mirrors the --foreground / --background / --line tokens in globals.css so
 * diagrams read as part of the page rather than as default mermaid.
 */
const palettes = {
  dark: {
    background: "#0a0a0a",
    clusterBackground: "#0a0a0a",
    surface: "#18181b",
    surfaceAlt: "#27272a",
    text: "#e4e4e7",
    strongText: "#f4f4f5",
    border: "rgba(255, 255, 255, 0.35)",
    softBorder: "rgba(255, 255, 255, 0.2)",
    noteBorder: "rgba(255, 255, 255, 0.25)",
    line: "rgba(255, 255, 255, 0.45)"
  },
  light: {
    background: "#ffffff",
    clusterBackground: "#fafafa",
    surface: "#f4f4f5",
    surfaceAlt: "#e4e4e7",
    text: "#121215",
    strongText: "#09090b",
    border: "rgba(9, 9, 11, 0.35)",
    softBorder: "rgba(9, 9, 11, 0.2)",
    noteBorder: "rgba(9, 9, 11, 0.25)",
    line: "rgba(9, 9, 11, 0.5)"
  }
};

/** Spreads one palette across every mermaid variable that needs it */
function themeVariablesFor(mode: "dark" | "light") {
  const palette = palettes[mode];

  return {
    background: palette.background,
    primaryColor: palette.surface,
    primaryTextColor: palette.strongText,
    primaryBorderColor: palette.border,
    secondaryColor: palette.surfaceAlt,
    tertiaryColor: palette.background,
    lineColor: palette.line,
    textColor: palette.text,
    nodeBorder: palette.border,
    clusterBkg: palette.clusterBackground,
    clusterBorder: palette.softBorder,
    edgeLabelBackground: palette.background,
    actorBkg: palette.surface,
    actorBorder: palette.border,
    actorTextColor: palette.strongText,
    signalColor: palette.line,
    signalTextColor: palette.text,
    labelBoxBkgColor: palette.surface,
    labelBoxBorderColor: palette.border,
    labelTextColor: palette.strongText,
    loopTextColor: palette.text,
    noteBkgColor: palette.surfaceAlt,
    noteBorderColor: palette.noteBorder,
    noteTextColor: palette.text,
    sequenceNumberColor: palette.background
  };
}

/**
 * Mermaid keeps one global config and a scratch element per render, so
 * overlapping renders clobber each other: a diagram rendered with the other
 * theme, or one render deleting the scratch node another is still using. That
 * happens whenever two renders start together, e.g. StrictMode running the
 * effect twice after a client-side navigation. Every render goes through this
 * queue instead.
 */
let renderQueue: Promise<unknown> = Promise.resolve();
let renderCount = 0;

function renderSerially<T>(task: () => Promise<T>): Promise<T> {
  const run = renderQueue.then(task, task);
  renderQueue = run.catch(() => undefined);
  return run;
}

/**
 * Renders a mermaid diagram from a ```mermaid fenced code block.
 *
 * Mermaid is browser-only and heavy (~3MB), so it is dynamically imported
 * inside the effect, so it never lands in the server bundle or the initial
 * client chunk. Diagrams re-render when the theme flips so they stay legible
 * in both light and dark.
 */
export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [failed, setFailed] = useState(false);

  // useId() emits characters that are illegal in a DOM id / CSS selector
  // (React 18 uses ":r0:", React 19 uses "«r0»"), and mermaid selects the
  // node it renders into by id, so strip everything non-alphanumeric.
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    // resolvedTheme is undefined until next-themes hydrates; waiting avoids
    // rendering the diagram once in the wrong palette and then again.
    if (!resolvedTheme) return;

    let cancelled = false;

    (async () => {
      // A fresh id per attempt, so a stale render never shares a scratch node
      const renderId = `${id}-${++renderCount}`;
      try {
        const mermaid = (await import("mermaid")).default;

        const rendered = await renderSerially(async () => {
          if (cancelled) return null;
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            fontFamily:
              "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
            themeVariables: themeVariablesFor(
              resolvedTheme === "dark" ? "dark" : "light"
            )
          });
          return (await mermaid.render(renderId, chart.trim())).svg;
        });
        if (!cancelled && rendered !== null) {
          setSvg(rendered);
          setFailed(false);
        }
      } catch (error) {
        console.error("Mermaid render failed:", error);
        if (!cancelled) setFailed(true);
      } finally {
        // mermaid leaves its scratch element behind when rendering throws
        document.getElementById(`d${renderId}`)?.remove();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  // Invalid diagram source: show it rather than swallowing it silently.
  if (failed) {
    return (
      <pre className="my-6 overflow-x-auto border border-line p-4 text-sm text-subtle">
        {chart.trim()}
      </pre>
    );
  }

  return (
    <div
      className="mermaid-diagram my-8 flex justify-center overflow-x-auto"
      // Mermaid returns a sanitized SVG string (securityLevel: "strict"),
      // and the source is our own markdown, not user input.
      dangerouslySetInnerHTML={{ __html: svg }}
      // Reserve height while the dynamic import resolves so the page
      // does not jump once the diagram appears.
      style={{ minHeight: svg ? undefined : "6rem" }}
    />
  );
}
