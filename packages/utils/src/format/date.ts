/**
 * Date formatting utilities.
 *
 * `formatDate` renders day-before-month with a 4-digit year — e.g. 1 March 2024
 * formats as "1/03/2024". The `en-GB` locale is used because it orders the fields
 * d/m/y without forcing a leading zero on the day, and `dateStyle: 'short'` is
 * deliberately avoided since it truncates the year to two digits.
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
