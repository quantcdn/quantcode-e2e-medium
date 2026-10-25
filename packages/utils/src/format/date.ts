/**
 * Date formatting utilities.
 *
 * Australian dates are day-first: D/MM/YYYY (e.g. 1/03/2024, 15/06/2024).
 *
 * The field order is taken from the `en-AU` locale rather than hard-coded, so
 * the day always precedes the month. The day part is emitted without a leading
 * zero — some ICU builds pad `day: "numeric"` to two digits for `en-AU`, so we
 * normalise it via `formatToParts` instead of trusting the raw formatted
 * string. `dateStyle: "short"` is deliberately avoided here because it renders
 * a 2-digit year (1/3/24).
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
