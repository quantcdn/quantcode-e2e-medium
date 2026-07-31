/**
 * Date formatting utilities.
 */

/**
 * Format a date as an Australian-style D/MM/YYYY string (e.g. `15/06/2024`,
 * `1/03/2024`) in the viewer's local timezone.
 *
 * Note on implementation: ICU normalises `en-AU` to a zero-padded day whenever
 * explicit field options are supplied, *regardless of the order they are given
 * in* — so `{ day: 'numeric', month: 'numeric', year: 'numeric' }` still yields
 * `01/03/2024`. The only option that produces an unpadded day is
 * `dateStyle: 'short'`, but that also truncates the year to two digits
 * (`1/3/24`). To get an unpadded day alongside a four-digit year we format to
 * parts and strip the day's padding ourselves. Do not "simplify" this back to a
 * plain `format()` call without re-running date.test.ts.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const value = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? ""

  return `${Number(value("day"))}/${value("month")}/${value("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
