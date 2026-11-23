/**
 * Date formatting utilities.
 *
 * formatDate uses the `en-AU` locale and assembles the parts explicitly in
 * Australian order: D/MM/YYYY (day without padding, zero-padded month).
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (t: string) => String(parts.find((p) => p.type === t)?.value ?? "")
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
