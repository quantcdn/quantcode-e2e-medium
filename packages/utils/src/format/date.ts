/**
 * Date formatting utilities.
 *
 * `formatDate` returns an Australian-style `D/MM/YYYY` string (day without
 * leading zero, two-digit month, four-digit year), built from the `en-AU`
 * locale's formatted parts so the order is always day, month, year.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
