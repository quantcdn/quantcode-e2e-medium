/**
 * Date formatting utilities.
 *
 * Dates are rendered in Australian style: day before month, with an
 * unpadded day, a zero-padded month and a four-digit year (e.g. 1/03/2024).
 */
const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  // `en-AU` widens a numeric day to 2-digit when combined with other fields,
  // so rebuild from parts to keep the day unpadded while preserving D/M/Y order.
  return dateFormatter
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
