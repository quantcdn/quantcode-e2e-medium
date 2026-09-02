/**
 * Date formatting utilities.
 *
 * formatDate produces day-first D/MM/YYYY output (e.g. 1/03/2024) so a
 * single-digit day is never mistaken for a month. `en-GB` is used rather than
 * `en-AU` because under ICU the `en-AU` numeric day is always zero-padded,
 * which would render 01/03/2024; both locales are day-first, so the field
 * ordering is unchanged.
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
