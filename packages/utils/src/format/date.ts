/**
 * Date formatting utilities.
 *
 * Australian dates are day/month/year. `Intl.DateTimeFormat("en-AU", ...)`
 * gives the correct field order, but CLDR pads the day to two digits whenever
 * the pattern is fully numeric, producing "01/03/2024". We want an unpadded
 * day with a zero-padded month ("1/03/2024"), so the day part is taken from
 * `formatToParts` and the leading zero stripped while the locale keeps
 * ownership of field order and separators.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return AU_DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}