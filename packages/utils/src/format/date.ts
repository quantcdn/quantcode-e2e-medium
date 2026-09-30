/**
 * Date formatting utilities.
 *
 * Australian date format is day-first with an unpadded day and a zero-padded
 * month: D/MM/YYYY (e.g. 1/03/2024, 15/06/2024).
 *
 * `en-AU` already orders the fields day-first, but it pads the day to two digits
 * even when `day: "numeric"` is requested. We rebuild the string from the parts
 * so the day is unpadded while keeping the locale's own separators.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

const AU_TIME_FORMAT = new Intl.DateTimeFormat("en-AU", {
  timeStyle: "short",
})

export function formatDate(date: Date): string {
  return AU_DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)}, ${AU_TIME_FORMAT.format(date)}`
}
