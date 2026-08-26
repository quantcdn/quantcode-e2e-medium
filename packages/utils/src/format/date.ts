/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY for the Australian locale (e.g. "1/03/2024").
 *
 * The en-AU locale coerces `day: "numeric"` to `day: "2-digit"`, which pads
 * single-digit days to "01". We format to parts and unpad the day so the output
 * keeps a natural day-first form while retaining the four-digit year.
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
