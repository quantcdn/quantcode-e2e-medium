/**
 * Date formatting utilities.
 *
 * Formats dates as D/MM/YYYY using the en-AU locale.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (t: string) => String(Number(parts.find((p) => p.type === t)?.value))
  const month = parts.find((p) => p.type === "month")?.value ?? ""
  return `${get("day")}/${month}/${parts.find((p) => p.type === "year")?.value}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
