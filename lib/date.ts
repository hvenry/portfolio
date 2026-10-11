/**
 * "2026-02-14" -> "February 14, 2026". Content dates are calendar dates, which
 * `new Date` parses as midnight UTC, so they are formatted in UTC too;
 * formatting in local time shows the previous day anywhere west of UTC.
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
}
