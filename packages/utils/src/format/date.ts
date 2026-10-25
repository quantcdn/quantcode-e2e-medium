/**
 * Date formatting utilities.
 */

const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

/**
 * Format a date in Australian style — D/MM/YYYY.
 *
 * The day is rendered without a leading zero (1/03/2024) while the month stays
 * zero-padded and the year is four digits. `en-AU` pads the day even with
 * `day: 'numeric'`, so the day part is normalised via `formatToParts`.
 */
export function formatDate(date: Date): string {
  return AU_DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
