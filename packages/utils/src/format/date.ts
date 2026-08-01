/**
 * Date formatting utilities.
 *
 * `formatDate` produces the Australian `D/MM/YYYY` form (unpadded day, padded
 * month, four-digit year). Note that `en-AU` ignores the order in which the
 * `day`/`month` options are declared, and `dateStyle: 'short'` truncates the
 * year to two digits — so neither option alone yields this format. The parts
 * are formatted with the locale and then assembled explicitly.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
