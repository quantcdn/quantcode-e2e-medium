/**
 * Date formatting utilities.
 *
 * formatDate produces Australian day-first output with an unpadded day,
 * zero-padded month and four-digit year (e.g. 1/03/2024, 15/06/2024).
 *
 * The en-AU numeric pattern zero-pads the day even when `day: 'numeric'` is
 * requested, and `dateStyle: 'short'` truncates the year to two digits, so
 * neither option alone yields the required format. Formatting to parts lets us
 * strip the day's leading zero while preserving the locale's field ordering.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts.map((part) => (part.type === "day" ? String(Number(part.value)) : part.value)).join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
