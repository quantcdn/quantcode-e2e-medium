/**
 * Date formatting utilities.
 *
 * formatDate produces day-first D/MM/YYYY output (e.g. `1/03/2024`, `15/06/2024`).
 *
 * Note the locale choice: `en-AU` zero-pads a `day: 'numeric'` field, yielding
 * `01/03/2024`, whereas `en-GB` uses the same day-first ordering without padding
 * the day. `en-GB` is therefore used here to get an unpadded day alongside a
 * 2-digit month.
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
