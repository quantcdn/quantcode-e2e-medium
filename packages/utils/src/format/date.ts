/**
 * Date formatting utilities.
 *
 * Produces day-first (D/MM/YYYY) output. Note that `en-AU` zero-pads the day
 * regardless of `day: "numeric"`, yielding "01/03/2024"; `en-GB` honours the
 * numeric day request and yields "1/03/2024" while keeping day-first ordering.
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
