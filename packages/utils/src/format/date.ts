/**
 * Date formatting utilities.
 *
 * `formatDate` renders day-first (Australian) order with no leading zero on the
 * day — e.g. 1 March 2024 -> "1/03/2024". The `en-AU` pattern is `dd/MM/y`, so
 * it widens `day: "numeric"` back to two digits; the day part is trimmed via
 * `formatToParts` while the locale keeps control of field order and separators.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
