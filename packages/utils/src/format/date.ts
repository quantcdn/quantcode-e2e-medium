/**
 * Date formatting utilities.
 *
 * formatDate returns D/MM/YYYY (en-AU). With `day: "numeric"` this runtime's
 * ICU data still pads the day with a leading zero (e.g. "01/03/2024"), so the
 * parts are assembled manually to strip it ("1/03/2024").
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
