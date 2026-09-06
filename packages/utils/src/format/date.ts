/**
 * Date formatting utilities.
 *
 * Australian dates are day-first. `Intl.DateTimeFormat` with the `en-AU`
 * locale orders the fields correctly but always zero-pads the day, so the
 * day is read back from `formatToParts` and emitted unpadded while the
 * month stays two-digit and the year four-digit — keeping D/MM/YYYY
 * unambiguous. Both formatters share this shape so a single UI never shows
 * two different date formats.
 */
function formatDayFirst(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).formatToParts(date)

  const field = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""

  return `${Number(field("day"))}/${field("month")}/${field("year")}`
}

export function formatDate(date: Date): string {
  return formatDayFirst(date)
}

export function formatDateTime(date: Date): string {
  const time = new Intl.DateTimeFormat("en-AU", { timeStyle: "short" }).format(date)
  return `${formatDayFirst(date)}, ${time}`
}
