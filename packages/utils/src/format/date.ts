/**
 * Date formatting utilities.
 *
 * `formatDate` produces Australian D/MM/YYYY output — the day has no leading
 * zero, the month is zero-padded, and the year is four digits. Option order in
 * the `Intl.DateTimeFormat` bag has no effect on field ordering (that comes
 * from the locale), so the parts are assembled explicitly.
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
