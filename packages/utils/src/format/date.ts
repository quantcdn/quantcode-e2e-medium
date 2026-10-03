/**
 * Date formatting utilities.
 */

/**
 * Format a date in Australian style: D/MM/YYYY.
 *
 * The locale (`en-AU`) determines field order (day before month). The day is
 * emitted without a leading zero while the month stays zero-padded, so
 * 1 March 2024 formats as "1/03/2024".
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
