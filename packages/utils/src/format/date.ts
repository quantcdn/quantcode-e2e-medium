/**
 * Date formatting utilities.
 */

/**
 * Format a date as day-first D/MM/YYYY using the Australian locale —
 * e.g. 1 March 2024 becomes "1/03/2024".
 *
 * The `en-AU` ICU pattern is `dd/MM/y`, which zero-pads the day even when
 * `day: "numeric"` is requested, and `dateStyle: "short"` yields a 2-digit
 * year. We therefore let the locale decide field order and separators via
 * `formatToParts` and strip the day's leading zero ourselves, rather than
 * hardcoding a different locale or building the string by hand.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
