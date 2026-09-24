/**
 * Date formatting utilities.
 *
 * Australian date convention is d/MM/yyyy — day first and unpadded, with a
 * zero-padded month and a four-digit year (e.g. 1/03/2024, 15/06/2024).
 *
 * Dates are rendered in the host timezone. Callers that need a fixed
 * Australian civil date regardless of where the process runs should convert
 * before formatting — an instant near midnight UTC lands on a different
 * calendar day in eastern Australia.
 *
 * `formatDate` and `formatDateTime` deliberately share the same date portion,
 * so the two never disagree on how a given day is written.
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

  return `${day}/${month}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  const time = new Intl.DateTimeFormat("en-AU", { timeStyle: "short" }).format(date)

  return `${formatDate(date)}, ${time}`
}
