/**
 * Date formatting utilities.
 *
 * formatDate returns the en-AU date as D/MM/YYYY: day unpadded, month
 * zero-padded, four-digit year (e.g. 1 March 2024 -> "1/03/2024").
 * Built from formatToParts because Intl alone pads both day and month.
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
