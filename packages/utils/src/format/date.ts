/**
 * Date formatting utilities.
 *
 * Day-first Australian dates with an unpadded day, a zero-padded month and a
 * 4-digit year (e.g. 1/03/2024, 15/06/2024).
 *
 * The components are assembled from `formatToParts` rather than `format`
 * because `en-AU` widens a `numeric` day to `2-digit` when it is combined with
 * a `2-digit` month, which would pad the day (01/03/2024).
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""

  const day = String(Number(part("day")))
  const month = part("month").padStart(2, "0")
  const year = part("year")

  return `${day}/${month}/${year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
