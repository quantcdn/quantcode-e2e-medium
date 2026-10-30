/**
 * Date formatting utilities.
 *
 * `formatDate` returns an Australian-style date as D/MM/YYYY (day without
 * padding, month zero-padded), built from `en-AU` Intl parts so the order is
 * always day, month, year. `formatDateTime` uses the `en-AU` short date and
 * time styles.
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
