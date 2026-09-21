/**
 * Date formatting utilities.
 *
 * Produces Australian day-first dates with a non-zero-padded day and a
 * four-digit year, e.g. 1/03/2024 and 15/06/2024.
 *
 * `en-AU` already orders the fields day-first, but it resolves
 * `day: 'numeric'` to a zero-padded day ("01"), and `dateStyle: 'short'`
 * truncates the year to two digits ("1/3/24"). Neither is what we want, so
 * the parts are assembled explicitly while still taking the ordering and
 * separators from the locale-formatted values.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(part("day"))}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
