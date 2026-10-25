/**
 * Date formatting utilities.
 *
 * Australian date format is day-first: D/MM/YYYY. The day is rendered without
 * a leading zero, the month is zero-padded, and the year is four digits.
 */
const dateParts = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return dateParts
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
