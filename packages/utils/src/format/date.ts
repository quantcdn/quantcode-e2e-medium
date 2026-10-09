/**
 * Date formatting utilities.
 *
 * Formats dates as D/MM/YYYY using the `en-AU` locale, so the day always
 * precedes the month. The day is emitted without a leading zero (1/03/2024)
 * while the month stays zero-padded and the year uses four digits.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
