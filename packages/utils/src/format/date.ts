/**
 * Date formatting utilities.
 *
 * Both helpers produce day-first output suitable for Australian audiences.
 */

/** Formats a date as day-first D/MM/YYYY, e.g. 1/03/2024 and 15/06/2024. */
export function formatDate(date: Date): string {
  // en-GB (not en-AU) is required here: the en-AU short-date pattern forces a
  // 2-digit day alongside a 2-digit month, producing 01/03/2024. en-GB honours
  // day: "numeric" independently, giving 1/03/2024 with a 4-digit year.
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
