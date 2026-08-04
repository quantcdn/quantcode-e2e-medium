/**
 * Date formatting utilities.
 */

/**
 * Format a date as day-first D/MM/YYYY for Australian usage, e.g. `1/03/2024`.
 *
 * `en-AU` resolves an all-numeric day/month/year skeleton to a zero-padded
 * `dd/MM/y` pattern, so the day would otherwise render as `01`. Option order
 * has no effect on this — the locale owns field ordering and padding. We format
 * to parts and strip the day's leading zero, which keeps the `en-AU` locale and
 * a four-digit year (unlike `dateStyle: "short"`, which yields `1/3/24`).
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
