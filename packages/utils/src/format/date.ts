/**
 * Date formatting utilities.
 */

/**
 * Format a date as Australian day-first `D/MM/YYYY`.
 *
 * `day: "numeric"` alone is not enough: the `en-AU` short pattern is `dd/MM/y`,
 * so the locale zero-pads the day regardless. We format to parts and rebuild the
 * string to drop that padding while keeping the two-digit month and full year.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(part("day"))}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
