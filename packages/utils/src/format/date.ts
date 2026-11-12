/**
 * Date formatting utilities.
 *
 * Uses the en-AU locale. en-AU zero-pads the day even with `day: "numeric"`
 * (e.g. 05/03/2024), so the day is normalised via Number() to be unpadded;
 * the month stays two-digit.
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
