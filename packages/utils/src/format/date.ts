/**
 * Date formatting utilities.
 *
 * Australian dates are day-first: D/MM/YYYY.
 *
 * The en-AU locale widens a requested `day: "numeric"` to `2-digit` when day,
 * month and year are requested together, so `format()` alone yields
 * "01/03/2024". Building the string from `formatToParts` keeps the locale's
 * day-before-month ordering and separators while leaving the day unpadded.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

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
