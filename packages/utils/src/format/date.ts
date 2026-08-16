/**
 * Date formatting utilities.
 */

/**
 * Format a date as Australian D/MM/YYYY — e.g. `1/03/2024`, `15/06/2024`.
 *
 * `en-AU` already orders the fields day-first, but it resolves a requested
 * `day: "numeric"` up to `"2-digit"`, which would render `01/03/2024`. We build
 * the string from parts so the day keeps its natural width while the month
 * stays zero-padded and the year stays four digits.
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
