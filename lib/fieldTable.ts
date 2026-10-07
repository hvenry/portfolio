export type FieldValue = string | number | boolean;

export type FieldTableResult = {
  fields: Record<string, FieldValue>;
  /** Markdown after the field table, with HTML comments removed */
  body: string;
};

const HTML_COMMENT = /<!--[\s\S]*?-->/g;
const SEPARATOR = /^\|\s*:?-+:?\s*\|\s*:?-+:?\s*\|$/;

/** Cells of a `| a | b |` row; `\|` is a literal pipe inside a cell */
function cells(line: string): string[] | null {
  const row = line.trim();
  if (!row.startsWith("|") || !row.endsWith("|")) return null;
  return row
    .slice(1, -1)
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, "|"));
}

function coerce(raw: string): FieldValue {
  const value = raw.replace(/^"(.*)"$/, "$1");
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

/**
 * Reads a leading `| Field | Value |` table from a markdown body. Obsidian
 * renders it as visible text (unlike frontmatter, which the vault hides).
 * Only a table whose header is exactly Field and Value counts, so a table in
 * the description is never mistaken for fields; everything after is the body.
 */
export function parseFieldTable(markdown: string): FieldTableResult {
  const lines = markdown.replace(HTML_COMMENT, "").split(/\r?\n/);
  const fields: Record<string, FieldValue> = {};

  let index = 0;
  while (index < lines.length && lines[index].trim() === "") index++;

  const header = cells(lines[index] ?? "");
  const isFieldTable =
    header?.length === 2 &&
    header[0].toLowerCase() === "field" &&
    header[1].toLowerCase() === "value" &&
    SEPARATOR.test((lines[index + 1] ?? "").trim().replace(/\s+/g, " "));
  if (!isFieldTable) {
    return { fields, body: lines.slice(index).join("\n").trim() };
  }

  for (index += 2; index < lines.length; index++) {
    const row = cells(lines[index]);
    if (!row || row.length !== 2 || row[0] === "") break;
    fields[row[0]] = coerce(row[1]);
  }

  return { fields, body: lines.slice(index).join("\n").trim() };
}
