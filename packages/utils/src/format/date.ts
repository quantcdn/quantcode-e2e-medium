/**
 * Date formatting utilities.
 */

/**
 * Format a date as an Australian D/MM/YYYY string — e.g. `15/06/2024`, `1/03/2024`.
 *
 * `en-AU` already orders day before month, but requesting explicit date components
 * makes ICU choose a zero-padded day (`01/03/2024`). The day part is unpadded here so
 * the day reads naturally and cannot be mistaken for a month.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
