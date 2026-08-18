/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY for the Australian locale — day first, with no
 * leading zero on the day, and a zero-padded month.
 *
 * The `en-AU` ICU pattern resolves `day: "numeric"` up to `2-digit`, so it
 * always pads the day regardless of the option order. `dateStyle: "short"`
 * gives an unpadded day but truncates the year to 2 digits. So the parts are
 * assembled explicitly: the locale still supplies day-before-month ordering,
 * and the day pad is stripped here.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
