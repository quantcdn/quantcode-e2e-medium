/**
 * Format a date as D/MM/YYYY (en-AU), e.g. 1 March 2024 -> "1/03/2024".
 * The day is requested as "numeric" but some ICU builds still zero-pad it for
 * en-AU, so the parts are extracted and the day padding is stripped manually
 * to get a consistent unpadded day with a two-digit month.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ""
  return `${String(Number(get("day")))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
