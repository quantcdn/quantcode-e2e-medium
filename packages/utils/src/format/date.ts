/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). Note that the `en-AU` CLDR data
 * pads the day to two digits even when `day: "numeric"` is requested, producing
 * "01/03/2024". `en-GB` shares the same day-first ordering but honours an
 * unpadded day, giving "1/03/2024", so it is used for the numeric short form.
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
