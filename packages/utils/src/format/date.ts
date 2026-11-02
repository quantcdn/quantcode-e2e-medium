/**
 * Date formatting utilities.
 *
 * formatDate renders D/MM/YYYY using UTC getters so output is timezone-independent.
 */
export function formatDate(date: Date): string {
  const day = date.getUTCDate()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  return `${day}/${month}/${date.getUTCFullYear()}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
