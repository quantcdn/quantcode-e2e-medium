/**
 * Date formatting utilities.
 *
 * Produces Australian-style D/MM/YYYY dates, e.g. 1 March 2024 -> "1/03/2024"
 * and 15 June 2024 -> "15/06/2024".
 *
 * Note: the `en-AU` short-date pattern pads the day to two digits ("01/03/2024"),
 * so `en-GB` is used instead — it shares the day-before-month ordering but
 * honours `day: "numeric"` for an unpadded day.
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
