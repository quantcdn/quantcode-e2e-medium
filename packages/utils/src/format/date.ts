/**
 * Date formatting utilities.
 *
 * Australian date convention is day-first (D/MM/YYYY). The `en-AU` locale
 * orders the fields correctly but zero-pads a single-digit day, so the day
 * part is un-padded via `formatToParts` — giving "1/03/2024" rather than
 * "01/03/2024", while the month stays two-digit and the year four-digit.
 */
const DATE_PARTS_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return DATE_PARTS_FORMATTER.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
