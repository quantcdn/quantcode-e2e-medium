/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY for Australian locale — e.g. 1/03/2024, 15/06/2024.
 *
 * Note: `en-AU` silently upgrades `day: "numeric"` to `"2-digit"` via its
 * format-matching table, which would yield 01/03/2024. Property order is
 * irrelevant to Intl — field order comes from the locale, and `en-AU` is
 * already day-first. So the day's leading zero is stripped explicitly via
 * `formatToParts` rather than by requesting `day: "numeric"`.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts.map((part) => (part.type === "day" ? String(Number(part.value)) : part.value)).join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
