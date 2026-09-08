/**
 * Date formatting utilities.
 *
 * `formatDate` produces Australian-style D/MM/YYYY (e.g. 1/03/2024, 15/06/2024).
 *
 * The `en-GB` locale is used deliberately rather than `en-AU`: both order the
 * fields day-first, but ICU resolves `day: 'numeric'` to `2-digit` under
 * `en-AU`, which zero-pads single-digit days to `01`. `en-GB` honours
 * `day: 'numeric'`, giving an unpadded day alongside a 2-digit month.
 *
 * Note: `dateStyle: 'short'` is not a substitute here — it yields a 2-digit
 * year (`1/3/24`) and cannot be combined with explicit `day`/`month` options.
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
