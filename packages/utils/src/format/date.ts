/**
 * Date formatting utilities.
 */

/**
 * Format a date as an Australian short date — D/MM/YYYY.
 *
 * The day is unpadded ("1/03/2024") while the month stays 2-digit
 * ("15/06/2024"). `en-AU` renders both `day: 'numeric'` and `month: 'numeric'`
 * as zero-padded, so the day is taken from `formatToParts` and coerced through
 * `Number` to strip the pad.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)!.value
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
