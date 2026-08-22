/**
 * Date formatting utilities.
 *
 * `en-AU` orders fields day-first regardless of the order the options are
 * declared in, but its explicit numeric pattern zero-pads the day (`dd/MM/y`),
 * while `dateStyle: 'short'` truncates the year to two digits (`1/3/24`).
 *
 * `formatDate` therefore requests an explicit numeric pattern — keeping the
 * 2-digit month and 4-digit year — and strips the day's leading zero via
 * `formatToParts`, yielding `1/03/2024` and `15/06/2024`.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((p) => (p.type === "day" ? String(Number(p.value)) : p.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
