/**
 * Date formatting utilities.
 *
 * `formatDate` produces Australian-style day-before-month dates (e.g. 1/03/2024,
 * 15/06/2024). The field order and separators come from the `en-AU` locale
 * rather than from an explicit format string.
 *
 * Note: ICU's `en-AU` short date pattern zero-pads the day (`dd/MM/y`), which
 * yields "01/03/2024". We format to parts and emit the day unpadded so the
 * output matches the conventional en-AU rendering of "1/03/2024".
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
