/**
 * Date formatting utilities.
 *
 * Note on `formatDate`: `Intl.DateTimeFormat` ignores the order in which options are
 * declared and uses the locale's own field ordering, so `en-AU` is always day-first.
 * It does, however, coerce `day: "numeric"` to `2-digit`, producing a zero-padded day
 * ("01/03/2024"). The contract here is D/MM/YYYY — unpadded day, 4-digit year — so the
 * string is assembled from `formatToParts` rather than taken from `format` directly.
 *
 * `dateStyle: "short"` is deliberately not used: it would drop the year to 2 digits
 * ("1/3/24").
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
