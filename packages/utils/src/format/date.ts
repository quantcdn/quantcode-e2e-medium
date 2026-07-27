/**
 * Date formatting utilities.
 *
 * `formatDate` renders Australian day-first dates as D/MM/YYYY — the day has no
 * leading zero, the month is always two digits, e.g. 15/06/2024 and 1/03/2024.
 *
 * The `en-AU` ICU pattern pads the day to two digits ("01/03/2024") even with
 * `day: 'numeric'`, so the parts are assembled explicitly rather than relying
 * on the locale's pattern. Using `formatToParts` keeps the field values
 * locale/calendar-derived (and timezone-correct) instead of reading UTC
 * getters, while giving us control over the day's zero padding.
 */
const AU_DATE_PARTS = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  const parts = AU_DATE_PARTS.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  const day = String(Number(get("day")))
  const month = get("month")
  const year = get("year")

  return `${day}/${month}/${year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
