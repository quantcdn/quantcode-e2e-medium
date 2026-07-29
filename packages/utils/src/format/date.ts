/**
 * Date formatting utilities.
 */

/**
 * Format a date as Australian D/MM/YYYY.
 *
 * Note: ICU widens `day: "numeric"` to `2-digit` when day, month and year are
 * requested together, producing "01/03/2024". We format to parts and re-assemble
 * so the day is not zero-padded while the month stays padded and the year stays
 * four digits.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
