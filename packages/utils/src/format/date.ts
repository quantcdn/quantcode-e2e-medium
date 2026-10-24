/**
 * Date formatting utilities.
 *
 * Australian convention is day-first: `d/MM/yyyy` (e.g. 1/03/2024, 15/06/2024).
 * The `en-AU` locale already orders the fields day/month/year, but it pads the
 * day to two digits, so the day is read off `formatToParts` and emitted without
 * a leading zero while the month stays zero-padded for an unambiguous reading.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  const parts = AU_DATE_FORMAT.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""

  const day = String(Number(get("day")))
  return `${day}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
