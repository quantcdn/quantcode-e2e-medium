/**
 * Date formatting utilities.
 *
 * Australian date convention is day-before-month. `formatDate` produces
 * `d/MM/yyyy` (e.g. `1/03/2024`, `15/06/2024`).
 *
 * Note: the ICU data for `en-AU` resolves `day: 'numeric'` to a zero-padded
 * 2-digit day, so the day part is taken from `formatToParts` with any leading
 * zero stripped rather than relying on the locale pattern alone.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  const parts = AU_DATE_FORMAT.formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  const day = String(Number(part("day")))

  return `${day}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
