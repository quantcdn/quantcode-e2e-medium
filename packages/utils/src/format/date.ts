/**
 * Date formatting utilities.
 *
 * Australian dates are day-first. Using `dateStyle: 'short'` with the `'en-AU'`
 * locale lets ICU order and pad the fields correctly (e.g. 15/6/24, 1/3/24)
 * rather than imposing an explicit field order.
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
