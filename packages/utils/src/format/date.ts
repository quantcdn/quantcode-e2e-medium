/**
 * Date formatting utilities.
 */

/**
 * Format a date in Australian day-first style, e.g. `1/03/2024`, `15/06/2024`.
 *
 * The `en-AU` locale determines field ordering (day before month). Its ICU
 * pattern is `dd/MM/y`, which pads the day to two digits, so the day part is
 * re-emitted without its leading zero via `formatToParts`.
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
