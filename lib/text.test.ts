import { test } from "node:test";
import assert from "node:assert/strict";
import { fitFontSize, truncate } from "./text.ts";

test("leaves text that fits unchanged, collapsing whitespace", () => {
  assert.equal(truncate("  A short\n line  ", 40), "A short line");
});

test("cuts at a word boundary and adds an ellipsis within the limit", () => {
  const out = truncate(
    "A comprehensive reference for every markdown feature",
    30
  );
  assert.equal(out, "A comprehensive reference for…");
  assert.ok(out.length <= 30);
});

test("drops trailing punctuation before the ellipsis", () => {
  assert.equal(
    truncate("headings, code blocks, tables, lists", 24),
    "headings, code blocks…"
  );
});

test("hard-cuts a single long word rather than returning almost nothing", () => {
  assert.equal(
    truncate("Supercalifragilisticexpialidocious", 10),
    "Supercali…"
  );
});

test("keeps the maximum size when the text fits", () => {
  assert.equal(
    fitFontSize("henryvendittelli.com/projects/ootd", {
      max: 48,
      width: 940,
      em: 0.43
    }),
    48
  );
});

test("shrinks the size so long text fits the width", () => {
  const text = "henryvendittelli.com/blog/a-much-longer-post-slug-than-usual";
  const size = fitFontSize(text, { max: 48, width: 940, em: 0.43 });
  assert.ok(size < 48);
  assert.ok(text.length * 0.43 * size <= 940);
});
