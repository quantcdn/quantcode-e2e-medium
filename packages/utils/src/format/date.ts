/**
 * Date formatting utilities.
 *
 * Australian date format is day-before-month. `dateStyle: 'short'` with the
 * `en-AU` locale yields D/M/YY with an un-padded day (e.g. 1/3/24), so the
 * day is never mistaken for a month.
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
