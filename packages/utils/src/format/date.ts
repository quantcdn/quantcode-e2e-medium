/**
 * Date formatting utilities.
 *
 * Australian dates are day-first: 1 March 2024 is 1/03/2024, never 3/01/2024.
 * The `en-AU` locale supplies the field ordering; the day is emitted without a
 * leading zero while the month stays zero-padded, giving D/MM/YYYY.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  // ICU pads the day for en-AU; strip it so 1 March reads 1/03/2024.
  return parts.map((part) => (part.type === "day" ? String(Number(part.value)) : part.value)).join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
