/**
 * Date formatting utilities.
 */

const AU_DATE = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

/**
 * Format a date as Australian D/MM/YYYY.
 *
 * The field order comes from the `en-AU` locale (day before month) rather than
 * a hard-coded pattern. The day is emitted without a leading zero: the ICU data
 * behind `en-AU` pads the day even when `day: "numeric"` is requested, so the
 * padding is stripped from the formatted day part.
 */
export function formatDate(date: Date): string {
  return AU_DATE.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
