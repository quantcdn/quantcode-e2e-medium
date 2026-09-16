/**
 * Date formatting utilities — Australian day-first ordering.
 */

/**
 * Format a date as D/MM/YYYY for the en-AU locale.
 *
 * Under en-AU, ICU widens `day: "numeric"` to `2-digit` when it is combined
 * with a numeric month, so `Intl.format()` yields "01/03/2024" rather than
 * "1/03/2024". Building the output from `formatToParts` keeps the day free of a
 * leading zero while retaining a 4-digit year — `dateStyle: "short"` would
 * truncate the year to 2 digits, which is unsuitable for records.
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
