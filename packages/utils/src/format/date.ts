/**
 * Date formatting utilities.
 */

/**
 * Format a date as Australian D/MM/YYYY — day first, month zero-padded, full year.
 *
 * The `en-AU` locale orders the fields correctly (day before month), but pads
 * the day to two digits. We rebuild from `formatToParts` so the day is rendered
 * unpadded (1/03/2024) while keeping locale-driven field ordering.
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
