/**
 * Date formatting utilities.
 *
 * formatDate returns D/MM/YYYY (e.g. "1/03/2024"). The en-AU ICU data
 * zero-pads the day, so we build the string from formatToParts to drop the
 * day's leading zero while keeping the month padded.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
