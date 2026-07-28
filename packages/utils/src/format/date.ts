/**
 * Date formatting utilities.
 *
 * Uses `dateStyle: 'short'` with the `'en-AU'` locale to produce day-first
 * Australian dates with an unpadded day (e.g. 1/3/24). Note that explicit
 * `day`/`month` numeric options are NOT equivalent — Intl ignores property
 * order and zero-pads under en-AU, yielding 01/03/2024.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", { dateStyle: "short" }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
