/**
 * Date formatting utilities.
 *
 * formatDate renders day-first (D/MM/YYYY) — the day is not zero-padded while
 * the month is, e.g. 1 March 2024 formats as "1/03/2024".
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
