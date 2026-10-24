/**
 * Date formatting utilities.
 */

/**
 * Format a date in Australian style — day before month, with an unpadded day
 * and a zero-padded month (e.g. `1/03/2024`, `15/06/2024`).
 *
 * `en-AU` orders the fields correctly but widens `day: "numeric"` to `2-digit`,
 * so the day part is narrowed back to its numeric form after formatting.
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
