import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { PiArrowSquareOut } from "react-icons/pi";
import Mermaid from "./Mermaid";
import CopyCodeButton from "./CopyCodeButton";
import React from "react";
import "katex/dist/katex.min.css";

// Colours are CSS variables (globals.css) so the palette follows data-theme
// in CSS, correct on first paint without reading the theme in JS
const codeTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: "var(--code-fg)",
    background: "none",
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    fontSize: "1em",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.6",
    tabSize: 2,
    hyphens: "none"
  },
  'pre[class*="language-"]': {
    color: "var(--code-fg)",
    background: "var(--code-bg)",
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    fontSize: "1em",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.6",
    tabSize: 2,
    hyphens: "none",
    padding: "1.5rem",
    margin: 0,
    overflow: "auto"
  },
  comment: { color: "var(--code-comment)" },
  prolog: { color: "var(--code-comment)" },
  doctype: { color: "var(--code-comment)" },
  cdata: { color: "var(--code-comment)" },
  punctuation: { color: "var(--code-fg)" },
  property: { color: "var(--code-blue)" },
  tag: { color: "var(--code-cyan)" },
  boolean: { color: "var(--code-pink)" },
  number: { color: "var(--code-amber)" },
  constant: { color: "var(--code-pink)" },
  symbol: { color: "var(--code-pink)" },
  deleted: { color: "var(--code-red)" },
  selector: { color: "var(--code-green)" },
  "attr-name": { color: "var(--code-blue)" },
  string: { color: "var(--code-green)" },
  char: { color: "var(--code-green)" },
  builtin: { color: "var(--code-blue)" },
  inserted: { color: "var(--code-green)" },
  operator: { color: "var(--code-fg)" },
  entity: { color: "var(--code-amber)", cursor: "help" },
  url: { color: "var(--code-cyan)" },
  ".language-css .token.string": { color: "var(--code-amber)" },
  ".style .token.string": { color: "var(--code-amber)" },
  atrule: { color: "var(--code-pink)" },
  "attr-value": { color: "var(--code-green)" },
  keyword: { color: "var(--code-pink)" },
  function: { color: "var(--code-blue)" },
  "class-name": { color: "var(--code-amber)" },
  regex: { color: "var(--code-amber)" },
  important: { color: "var(--code-pink)", fontWeight: "bold" },
  variable: { color: "var(--code-fg)" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" }
};

function CodeBlock({
  language,
  codeString
}: {
  language: string;
  codeString: string;
}) {
  return (
    <div
      className="my-6 overflow-hidden"
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--code-border)"
      }}
    >
      {language && (
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{
            borderBottom: "1px solid var(--code-border)",
            background: "var(--code-header-bg)"
          }}
        >
          <span className="text-[color:var(--code-label)] text-xs font-mono">
            {language}
          </span>
          <CopyCodeButton code={codeString} />
        </div>
      )}
      <SyntaxHighlighter
        language={language || "text"}
        style={codeTheme}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "1rem 1.5rem",
          fontSize: "0.875rem",
          lineHeight: "1.7",
          background: "var(--code-bg)",
          border: "none",
          boxShadow: "none",
          color: language ? undefined : "var(--code-plain)"
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default function BlogContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-wide text-foreground mt-12 mb-6 pb-2 border-b border-line">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-foreground mt-10 mb-5 pb-2 border-b border-line">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-wide text-foreground mt-8 mb-4">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-display text-lg sm:text-xl font-semibold text-foreground mt-6 mb-3">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="font-display text-base sm:text-lg font-semibold text-foreground mt-5 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="font-display text-base font-semibold text-foreground mt-4 mb-2">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="text-base sm:text-lg leading-relaxed mb-6 text-muted">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-6 mb-6 space-y-3">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-6 mb-6 space-y-3">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base sm:text-lg leading-relaxed text-muted">
              {children}
            </li>
          ),
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const rawString = String(children);

            // Mermaid fences become rendered diagrams, not syntax-highlighted source
            if (language === "mermaid") {
              return <Mermaid chart={rawString} />;
            }

            // Fenced code blocks always have a trailing newline; inline code never does
            const isBlock = rawString.includes("\n") || !!language;

            if (!isBlock) {
              // Inverts per theme: a near-black chip on light, near-white on dark
              return (
                <code className="bg-foreground/90 px-1.5 py-0.5 text-sm text-background">
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                language={language}
                codeString={rawString.replace(/\n$/, "")}
              />
            );
          },
          // Let CodeBlock handle its own wrapper; pre is redundant here
          pre: ({ children }) => <>{children}</>,
          a: ({ children, href }) => {
            const external = href?.startsWith("http") ?? false;
            return (
              <a
                href={href}
                className="link"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {children}
                {external && (
                  <>
                    <PiArrowSquareOut
                      aria-hidden
                      className="ml-0.5 inline-block size-[0.85em] align-[-0.1em]"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </>
                )}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-foreground/40 pl-6 py-2 italic my-6 bg-foreground/5">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-line my-8" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-muted">{children}</em>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-line">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-foreground/10 border-b border-foreground/40">
              {children}
            </thead>
          ),
          // Owns every row border: prose also gives each body row a light
          // grey bottom border, which stacked with divide-y doubled the line
          // under the first row
          tbody: ({ children }) => (
            <tbody className="[&>tr:last-child]:border-b-0 [&>tr]:border-b [&>tr]:border-line">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-foreground/5 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-base text-muted">{children}</td>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
