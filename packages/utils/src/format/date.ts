/**
 * Date formatting utilities.
 *
 * `formatDate` produces Australian day-first dates (D/MM/YYYY). The day is
 * rendered without zero-padding, so 1 March 2024 formats as `1/03/2024`.
 * `en-AU` pads the day whenever the month is numeric, so the day part is
 * un-padded here while the locale keeps the field ordering.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
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
