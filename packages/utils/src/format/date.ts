/**
 * Date formatting utilities.
 *
 * Australian convention is day-first (D/MM/YYYY). The day is rendered
 * un-padded so `1 March 2024` formats as `1/03/2024` and can never be
 * misread as the US month-first `3/01/2024`.
 *
 * Note the `en-GB` locale: it shares Australia's day/month/year ordering and
 * separator, but unlike `en-AU` it honours `day: "numeric"` by leaving the day
 * un-padded. `en-AU` forces a 2-digit day regardless of the requested option.
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
