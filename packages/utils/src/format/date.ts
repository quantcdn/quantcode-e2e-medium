/**
 * Date formatting utilities.
 *
 * formatDate returns en-AU day-first order separated by "/": unpadded day,
 * 2-digit month, 4-digit year (the runtime may pad the day, so leading zeros are stripped) (e.g. 5 March 2024 -> "5/03/2024"). Any part
 * the formatter fails to supply falls back to an empty string.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ""
  const day = part("day").replace(/^0+(?=\d)/, "")
  return `${day}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
