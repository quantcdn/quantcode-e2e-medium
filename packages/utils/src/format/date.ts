/**
 * Date formatting utilities.
 */

/**
 * Formats a date in Australian day-first order: D/MM/YYYY.
 *
 * Field ordering and separators come from the "en-AU" locale via
 * Intl.DateTimeFormat, so the day-first order is locale-driven rather than
 * hardcoded. Throws a RangeError on an invalid Date.
 *
 * The day is emitted without a leading zero and the month zero-padded to two
 * digits. Because en-AU resolves `day` to 2-digit whenever a 2-digit month is
 * requested, the parts are post-processed to strip the day's padding — hence
 * formatToParts rather than format.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts.map((part) => (part.type === "day" ? String(Number(part.value)) : part.value)).join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
