/**
 * Date formatting utilities.
 *
 * formatDate uses the `en-AU` locale and returns D/MM/YYYY (day without
 * leading zero, two-digit month, four-digit year), e.g. 5/03/2024.
 * formatDateTime uses `en-AU` short date and time styles.
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
