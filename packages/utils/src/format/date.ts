/**
 * Date formatting utilities.
 *
 * Australian date format is day-first: D/MM/YYYY (e.g. 1/03/2024, 15/06/2024).
 * The `en-AU` locale orders the fields correctly, but some ICU builds zero-pad
 * the day even when `day: "numeric"` is requested, so the day part is
 * normalised explicitly via `formatToParts`.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return AU_DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
