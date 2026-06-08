/**
 * Date formatting utilities.
 *
 * formatDate uses `dateStyle: 'short'` with the `en-AU` locale, which produces
 * D/M/YY output (e.g. "1/03/24") — day-first, no leading zero on the day,
 * two-digit year. This matches Australian short-date conventions.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
