/**
 * Date formatting utilities.
 *
 * Australian date convention is day-before-month (D/MM/YYYY) with no
 * zero-padding on the day. Bun's bundled ICU data for `en-AU` zero-pads the
 * day even when `day: 'numeric'` is requested, so `en-GB` — which shares the
 * same day/month/year ordering — is used to get an unpadded day.
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