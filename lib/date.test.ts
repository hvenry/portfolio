import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDate } from "./date.ts";

test("formats a content date as the same calendar day in any time zone", () => {
  for (const tz of ["America/Toronto", "Pacific/Honolulu", "Asia/Tokyo"]) {
    process.env.TZ = tz;
    assert.equal(formatDate("2026-02-14"), "February 14, 2026", tz);
  }
});
