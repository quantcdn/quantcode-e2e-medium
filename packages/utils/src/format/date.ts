/**
 * Date formatting utilities.
 *
 * formatDate uses the `en-AU` locale to extract day, month and year parts, then
 * assembles them as D/MM/YYYY: the day has no leading zero, the month is
 * zero-padded to two digits and the year is four digits (e.g. 5/03/2024).
 * Day-before-month ordering is fixed by the template, not the locale.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
  return `${String(Number(get("day")))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
