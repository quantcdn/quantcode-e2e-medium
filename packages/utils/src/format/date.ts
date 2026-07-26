/**
 * Date formatting utilities.
 */

/**
 * Format a date as Australian D/MM/YYYY — day-first, day not zero-padded,
 * month zero-padded.
 *
 * Note: `en-AU` resolves `day: 'numeric'` to `2-digit`, so `format()` alone
 * yields `01/03/2024`. The parts are read individually and the day coerced
 * through `Number` to drop the leading zero while the month stays padded.
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
