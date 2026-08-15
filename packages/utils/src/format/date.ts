/**
 * Date formatting utilities.
 *
 * `formatDate` renders Australian day-first dates as D/MM/YYYY — the day is
 * unpadded, the month is zero-padded and the year is four digits
 * (e.g. 1/03/2024, 15/06/2024).
 *
 * The `en-AU` locale already orders the fields day-month-year regardless of the
 * order the options are declared in, so ordering is left to the locale. We
 * request 2-digit parts and then strip the leading zero from the DAY part only,
 * via `formatToParts`, which keeps the locale's own separators intact.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((part) => (part.type === "day" ? part.value.replace(/^0/, "") : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
