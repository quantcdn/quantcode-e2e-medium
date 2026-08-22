/**
 * Date formatting utilities.
 */

/**
 * Formats a date as Australian `D/M/YYYY` — day first, no zero padding on the
 * day or month, four-digit year (e.g. `1/3/2024`).
 *
 * `Intl.DateTimeFormat('en-AU')` cannot produce this directly: requesting a
 * four-digit numeric year makes ICU select a pattern that zero-pads the day and
 * month (`01/03/2024`). Formatting to parts and reassembling keeps the
 * locale-correct day-first ordering while dropping the padding and preserving
 * the full year.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date)

  const value = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? ""

  const unpadded = (type: Intl.DateTimeFormatPartTypes): string =>
    String(Number(value(type)))

  return `${unpadded("day")}/${unpadded("month")}/${value("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
