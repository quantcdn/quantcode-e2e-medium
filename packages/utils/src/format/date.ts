/**
 * Date formatting utilities.
 *
 * Australian date format is D/MM/YYYY — day first, with no leading zero on
 * the day. `Intl.DateTimeFormat('en-AU')` orders the fields correctly but
 * zero-pads the day, so the day part is read from `formatToParts` and
 * emitted unpadded while the locale still drives field ordering.
 */
const DATE_PARTS_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  const parts = DATE_PARTS_FORMATTER.formatToParts(date)

  return parts
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
