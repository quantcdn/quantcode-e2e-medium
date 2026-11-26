/**
 * Date formatting utilities.
 *
 * formatDate outputs D/MM/YYYY. The en-AU locale zero-pads the day (e.g.
 * "05/03/2024"); we intentionally strip that padding from the day via
 * Number() while keeping the month zero-padded, giving "5/03/2024".
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
