import { test } from "node:test";
import assert from "node:assert/strict";
import { parseFieldTable } from "./fieldTable.ts";

const table = (rows: string) => `| Field | Value |\n| --- | --- |\n${rows}`;

test("reads a leading field table and returns the rest as the body", () => {
  const { fields, body } = parseFieldTable(
    table(
      "| organization | Empire Life |\n| role | Software Developer |\n\nBuilt things.\nMore things.\n"
    )
  );
  assert.deepEqual(fields, {
    organization: "Empire Life",
    role: "Software Developer"
  });
  assert.equal(body, "Built things.\nMore things.");
});

test("accepts padded cells and aligned separators, as Prettier and Obsidian write them", () => {
  const { fields } = parseFieldTable(
    "| Field        | Value          |\n| :----------- | -------------: |\n| organization | Empire Life    |\n"
  );
  assert.deepEqual(fields, { organization: "Empire Life" });
});

test("coerces numbers and booleans, unquotes strings", () => {
  const { fields } = parseFieldTable(
    table(
      '| order | 3 |\n| draft | true |\n| extra | "Awards: Excellence Scholarship" |\n| period | 2021 - 2025 |'
    )
  );
  assert.deepEqual(fields, {
    order: 3,
    draft: true,
    extra: "Awards: Excellence Scholarship",
    period: "2021 - 2025"
  });
});

test("keeps empty values and escaped pipes", () => {
  const { fields } = parseFieldTable(
    table("| image |  |\n| role | Design \\| Build |")
  );
  assert.deepEqual(fields, { image: "", role: "Design | Build" });
});

test("strips HTML comments, including a leading guidance block", () => {
  const { fields, body } = parseFieldTable(
    "<!--\nHow to fill this in\n| Field | Value |\n-->\n" +
      table("| role | Analyst |\n\nText <!-- note --> here.")
  );
  assert.deepEqual(fields, { role: "Analyst" });
  assert.equal(body, "Text  here.");
});

test("ignores a leading table that is not a Field/Value table", () => {
  const markdown = "| Name | Score |\n| --- | --- |\n| a | 1 |\n\nText.";
  assert.deepEqual(parseFieldTable(markdown), { fields: {}, body: markdown });
});

test("returns no fields when the body does not start with a table", () => {
  assert.deepEqual(parseFieldTable("Just text.\n"), {
    fields: {},
    body: "Just text."
  });
});
