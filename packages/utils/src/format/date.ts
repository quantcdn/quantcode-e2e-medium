/**
 * Date formatting utilities.
 */

/**
 * Format a date as day-first D/MM/YYYY, e.g. 1/03/2024 and 15/06/2024.
 *
 * `en-GB` is used rather than `en-AU` because ICU's en-AU short-date pattern pins
 * the day to 2-digit — requesting `day: "numeric"` is silently upgraded, yielding
 * 01/03/2024. `en-GB` shares the day-first ordering but honours `day: "numeric"`.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
