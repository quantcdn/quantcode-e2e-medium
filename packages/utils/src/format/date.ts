/**
 * Date formatting utilities.
 *
 * formatDate returns Australian day-first dates with an unpadded day and a
 * zero-padded month (e.g. "1/03/2024", "15/06/2024"). The day padding is
 * stripped explicitly because the en-AU short pattern widens a "numeric" day
 * to two digits.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(part("day"))}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
