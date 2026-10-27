/**
 * Date formatting utilities.
 *
 * Dates are rendered in Australian D/MM/YYYY style — day first, with no
 * leading zero on the day so 1 March 2024 reads "1/03/2024".
 *
 * The `en-AU` short date pattern resolves `day: "numeric"` to a 2-digit day,
 * so the day part is emitted via `formatToParts` and its leading zero is
 * trimmed explicitly. Field order still comes from the locale, never from the
 * order the options are declared in.
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
