/**
 * Date formatting utilities.
 *
 * formatDate uses `formatToParts` with the `en-AU` locale so the locale controls
 * part order (DD/MM/YYYY), and the day is normalised to have no leading zero
 * while the month stays two-digit.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((p) => (p.type === "day" ? String(Number(p.value)) : p.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
