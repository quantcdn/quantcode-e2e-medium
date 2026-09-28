/**
 * Date formatting utilities.
 *
 * Australian dates are day-first: D/MM/YYYY (e.g. 15/06/2024, 1/03/2024).
 * `en-AU` resolves an all-numeric request to a zero-padded day ("01/03/2024"),
 * so the day is emitted unpadded while the locale still determines field
 * ordering and the year keeps all four digits.
 */
const DATE_PART_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return DATE_PART_FORMATTER.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
