/**
 * Date formatting utilities.
 *
 * formatDate produces D/MM/YYYY output for the Australian locale
 * (e.g. 15/06/2024, 1/03/2024) — unpadded day, zero-padded month, four-digit
 * year. Built manually from date parts because Bun's ICU data pads the day
 * field even when `day: 'numeric'` is passed to Intl.DateTimeFormat.
 */
export function formatDate(date: Date): string {
  const day = date.getDate()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
