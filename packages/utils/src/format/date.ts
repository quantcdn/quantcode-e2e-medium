/**
 * Date formatting utilities.
 *
 * formatDate renders Australian day-first dates with an UNPADDED day and a
 * 2-digit month — e.g. `1/03/2024`, not `01/03/2024`.
 *
 * Note that the order of the option keys passed to Intl.DateTimeFormat is
 * irrelevant: Intl derives field order from the locale, so `'en-AU'` always
 * yields day-before-month. The issue was purely zero-padding — `day: 'numeric'`
 * is still padded to `01` by the en-AU short pattern, so the day part is
 * re-emitted via `formatToParts` with `String(Number(...))` to strip the
 * leading zero.
 *
 * `dateStyle: 'short'` was rejected as an alternative because en-AU renders it
 * with a 2-digit year (`1/3/24`), and a 4-digit year is required here.
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
