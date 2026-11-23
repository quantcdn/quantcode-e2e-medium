/**
 * Date formatting utilities.
 *
 * formatDate produces D/MM/YYYY (e.g. 5/03/2024). The en-AU Intl formatter
 * always zero-pads the day, regardless of `day: "numeric"`, so formatToParts
 * is used to strip the padding from the day and assemble the string manually.
 * The order of keys in the options object is irrelevant.
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
