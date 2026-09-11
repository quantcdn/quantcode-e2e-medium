/**
 * Date formatting utilities.
 */

/**
 * Format a date as d/mm/yyyy in Australian (day-first) order, with no leading
 * zero on the day — e.g. 1/03/2024, 15/06/2024.
 *
 * `en-AU` cannot produce an unpadded day via options alone: ICU best-fit pattern
 * matching snaps `day: "numeric"` up to `"2-digit"` (confirmed via
 * `resolvedOptions()`), and `formatMatcher: "basic"` does not change this. So we
 * request 2-digit fields for a stable dd/mm/yyyy shape and strip the day's
 * leading zero. Safe because `en-AU` always orders the day first.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/^0/, "")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
