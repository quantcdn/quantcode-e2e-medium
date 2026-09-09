/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY using Australian (day-first) ordering.
 *
 * The `en-AU` short-date pattern is `dd/MM/y`, so ICU pads the day to two
 * digits even when `day: 'numeric'` is requested. We format to parts and strip
 * the day's leading zero, which keeps the locale's day-first ordering and the
 * four-digit year (unlike `dateStyle: 'short'`, which yields a 2-digit year).
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts.map((p) => (p.type === "day" ? String(Number(p.value)) : p.value)).join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
