/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY using Australian conventions — day first, then
 * month, then the four-digit year.
 *
 * The part order and separators come from the `en-AU` locale rather than a
 * hand-built template. The day is emitted without a leading zero, so
 * 1 March 2024 formats as `1/03/2024`.
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
