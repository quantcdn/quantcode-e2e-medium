/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY for the en-AU locale (day-first, unpadded day).
 *
 * `Intl` in en-AU resolves `day: "numeric"` to a 2-digit day, and `dateStyle: "short"`
 * truncates the year to 2 digits. The parts are therefore reassembled from
 * `formatToParts` to drop the day's leading zero while keeping a padded month and
 * a 4-digit year: `1/03/2024`, `15/06/2024`, `25/12/2024`.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(part("day"))}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
