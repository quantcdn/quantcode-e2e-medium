/**
 * Date formatting utilities.
 *
 * `formatDate` uses `dateStyle: 'short'` so the `en-AU` locale decides both the
 * field order (day before month) and the field widths. Listing `day`/`month`/
 * `year` explicitly forces zero-padding, which renders 1 March as "01/03/2024"
 * rather than the Australian short form "1/3/24".
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
