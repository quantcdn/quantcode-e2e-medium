/**
 * Date formatting utilities.
 *
 * en-AU pads the day with a leading zero (01/03/2024) when the day is
 * "numeric", so formatDate strips it to produce D/MM/YYYY.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/^0/, "")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
