/**
 * Date formatting utilities.
 *
 * formatDate returns D/MM/YYYY (en-AU): day without a leading zero, 2-digit
 * month. Fields are assembled from formatToParts because Intl pads the day
 * whenever the month is 2-digit in this locale.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${String(Number(get("day")))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
