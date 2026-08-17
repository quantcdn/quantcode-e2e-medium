/**
 * Date formatting utilities.
 *
 * `formatDate` returns en-AU day/month/year order with a non-zero-padded day
 * and a zero-padded month — e.g. 1 March 2024 formats as "1/03/2024".
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)!.value
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
