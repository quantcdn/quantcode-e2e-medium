/**
 * Date formatting utilities.
 *
 * Dates are day-first (D/MM/YYYY) per `en-AU`, with the day's leading zero
 * stripped. The fixed time zone keeps output deterministic across hosts.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
  timeZone: "Australia/Sydney",
})

export function formatDate(date: Date): string {
  return AU_DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
