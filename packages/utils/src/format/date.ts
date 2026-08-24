/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). The `en-GB` locale is used for
 * `formatDate` because it yields a day-first, "/"-separated date where the day
 * is not zero-padded (e.g. 1/03/2024), whereas `en-AU` always pads the day.
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
