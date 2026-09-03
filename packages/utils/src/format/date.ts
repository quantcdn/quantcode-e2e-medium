/**
 * Date formatting utilities.
 *
 * Uses `dateStyle: 'short'` with the `'en-AU'` locale so the day precedes the
 * month (D/M/YY) and the day is not zero-padded.
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
