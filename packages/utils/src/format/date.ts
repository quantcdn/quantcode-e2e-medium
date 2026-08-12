/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). Field ordering and separators are
 * taken from the `en-AU` locale rather than hard-coded, so the output stays
 * correct if the locale's pattern changes. The `en-AU` CLDR pattern zero-pads
 * the day (`dd/MM/y`), so the day part is emitted without a leading zero while
 * the month keeps its two-digit form and the year stays four digits.
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
