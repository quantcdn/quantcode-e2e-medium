/**
 * Date formatting utilities.
 *
 * Formats a date in Australian D/MM/YYYY style (en-AU), e.g. `5/03/2024`.
 * The day has no leading zero; the month is zero-padded to two digits.
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
