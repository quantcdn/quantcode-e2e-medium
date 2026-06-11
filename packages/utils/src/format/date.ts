/**
 * Date formatting utilities.
 *
 * formatDate returns a D/MM/YYYY string (e.g. "15/06/2024", "1/03/2024")
 * using Australian day-before-month ordering. The day is unpadded, the month
 * is zero-padded to 2 digits, and the year is always 4 digits.
 */
export function formatDate(date: Date): string {
  const [year, month, day] = date.toISOString().slice(0, 10).split("-")
  return `${parseInt(day)}/${month}/${year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
