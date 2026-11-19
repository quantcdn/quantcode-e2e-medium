/**
 * Date formatting utilities (en-AU locale).
 */

/**
 * Formats a date in Australian day-first form, d/MM/yyyy: the day has no
 * leading zero, the month is zero-padded, and the year has four digits
 * (e.g. 5 March 2024 -> "5/03/2024").
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
