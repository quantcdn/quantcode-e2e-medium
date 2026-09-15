/**
 * Date formatting utilities.
 */
export function formatDate(date: Date): string {
  // en-AU is day-first, but `day: "numeric"` still zero-pads alongside a numeric
  // month (1 March -> "01/03/2024"). Build from parts so the day is unpadded while
  // the month stays 2-digit and the year stays 4-digit: "1/03/2024", "15/06/2024".
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
