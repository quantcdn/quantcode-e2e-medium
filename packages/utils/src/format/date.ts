/**
 * Date formatting utilities.
 *
 * Both functions use `dateStyle: 'short'` with the `'en-AU'` locale, which
 * yields day-first Australian dates without zero-padding the day (e.g.
 * 1/3/24). Specifying `day`/`month`/`year` as `'numeric'` individually is not
 * equivalent — for `en-AU` that resolves to a zero-padded day (01/03/2024)
 * regardless of the order the options are written in.
 */
export function formatDate(date: Date): string {
  // en-AU is day-first; use explicit numeric fields (not dateStyle:"short",
  // which truncates the year to 2 digits) and strip zero-padding from the
  // day/month so 1 March 2024 renders "1/3/2024", not "01/03/2024".
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: string) => parts.find((x) => x.type === type)!.value
  return `${Number(get("day"))}/${Number(get("month"))}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
