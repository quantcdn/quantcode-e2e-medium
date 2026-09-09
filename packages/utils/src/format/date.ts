/**
 * Date formatting utilities.
 *
 * Output is day-first and anchored to Australian Eastern time, so formatting
 * does not vary with the host timezone.
 *
 * Note on the locale: `en-GB` is used deliberately, not `en-AU`. Both are
 * day-first, but ICU resolves the en-AU numeric date skeleton to the pattern
 * `dd/MM/y`, which zero-pads the day regardless of `day: "numeric"` — giving
 * `01/03/2024`. `en-GB` honours `day: "numeric"` and yields `1/03/2024`.
 * Do not "correct" this to en-AU; that reintroduces the leading zero.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    timeZone: "Australia/Sydney",
  }).format(date)
}

/**
 * As `formatDate`, plus a short 12-hour time.
 *
 * The date fields mirror `formatDate` exactly (same locale and options) so the
 * two helpers never disagree on how a date is rendered. Note that `timeStyle`
 * cannot be combined with individual date fields — Intl throws a TypeError —
 * so the time is spelled out as `hour`/`minute`, with `hour12` pinned to keep
 * the `2:30 pm` form regardless of what the locale would otherwise resolve to.
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Australia/Sydney",
  }).format(date)
}
