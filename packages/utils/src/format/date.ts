/**
 * Date formatting utilities. Both formatters are day-first per Australian
 * convention, but they differ in width — see each function for its exact output.
 */
const dateParts = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

/**
 * Format a date as D/MM/YYYY — no leading zero on the day, zero-padded month,
 * four-digit year (e.g. `1/03/2024`, `15/06/2024`).
 *
 * Throws `RangeError` if `date` is an invalid Date.
 */
export function formatDate(date: Date): string {
  // Rely on the locale for field ordering (D/MM/YYYY), then strip the leading
  // zero en-AU adds to the day so single-digit days read as "1" not "01".
  return dateParts
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

/**
 * Format a date and time in the locale's short style — note this yields a
 * TWO-digit year and an unpadded month, unlike {@link formatDate}
 * (e.g. `1/3/24, 12:00 pm`).
 *
 * Throws `RangeError` if `date` is an invalid Date.
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
