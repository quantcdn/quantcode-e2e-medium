/**
 * Date formatting utilities.
 *
 * Australian date format is D/MM/YYYY — day first and not zero-padded,
 * month zero-padded, four-digit year (e.g. 1/03/2024, 15/06/2024).
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  // `en-AU` resolves `day: "numeric"` to "2-digit", so strip the day's leading
  // zero via formatToParts while keeping the locale's day-before-month ordering.
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
