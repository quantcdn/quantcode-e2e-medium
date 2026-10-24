/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY using the Australian locale.
 *
 * The `en-AU` locale supplies the day-before-month ordering and the `/`
 * separators. The day is rendered without a leading zero (1/03/2024), while
 * the month stays two-digit, so the day can never be mistaken for the month.
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
