/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY for the Australian locale — e.g. `1/03/2024`.
 *
 * Note: `Intl` ignores the *order* of the option keys and uses the locale's own
 * pattern, so `en-AU` already yields day-first. The reason for building the
 * string from `formatToParts` is that ICU's `en-AU` numeric skeleton zero-pads
 * the day (`01/03/2024`). `dateStyle: "short"` drops the padding but also
 * shortens the year to two digits, so it is not a substitute here.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)!.value
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
