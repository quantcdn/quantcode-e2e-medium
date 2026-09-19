/**
 * Date formatting utilities.
 */

/**
 * Format a date as D/MM/YYYY using Australian conventions (day before month).
 *
 * The `en-AU` locale resolves `day: "numeric"` to `"2-digit"`, so a plain
 * `format()` call always zero-pads the day ("01/03/2024"). We format the parts
 * individually and strip the day's leading zero, keeping the locale's own
 * day-before-month ordering and separators.
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
