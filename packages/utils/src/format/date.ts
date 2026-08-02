/**
 * Date formatting utilities.
 */

/**
 * Format a date as day-first D/MM/YYYY, without zero-padding the day.
 *
 * Uses `en-GB` rather than `en-AU` because `en-AU` zero-pads the day even under
 * `day: "numeric"` (producing "01/03/2024"). `en-GB` honours `numeric` for the
 * day while `month: "2-digit"` keeps the month padded and the ordering day-first.
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
