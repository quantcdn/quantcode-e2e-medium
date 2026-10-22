/**
 * Date formatting utilities.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""

  // Some ICU builds pad the day for en-AU even with day: "numeric";
  // strip any leading zero so day 1 renders as "1", not "01".
  const day = part("day").replace(/^0+(?=\d)/, "")

  return `${day}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
