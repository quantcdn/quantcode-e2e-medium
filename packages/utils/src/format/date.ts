/**
 * Date formatting utilities.
 *
 * Dates are rendered in Australian order (D/MM/YYYY) using the `en-AU`
 * locale. The day is emitted without a leading zero while the month stays
 * zero-padded and the year stays four digits, so the output is unambiguous
 * (e.g. `1/03/2024`, `15/06/2024`).
 */
const DATE_PARTS_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return DATE_PARTS_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
