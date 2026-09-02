/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY using Australian (day-first) ordering.
 *
 * The `en-AU` locale orders the parts day/month/year; the day is emitted
 * without a leading zero (1/03/2024) while the month stays zero-padded and
 * the year keeps all four digits.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) => (part.type === "day" ? part.value.replace(/^0/, "") : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
