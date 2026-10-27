/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (DD/MM/YYYY). Note that the `en-AU` ICU data
 * pads the day to two digits even when `day: "numeric"` is requested, so the
 * day part is normalised from the formatted parts to drop the leading zero
 * (e.g. 1/03/2024 rather than 01/03/2024).
 */
const DATE_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return DATE_FORMATTER.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}