/**
 * Date formatting utilities.
 *
 * Australian dates are day-first: D/MM/YYYY. The day is rendered without a
 * leading zero (1/03/2024, 15/06/2024) while the month keeps two digits.
 *
 * ICU pads the day to two digits for `en-AU` even with `day: 'numeric'`, so the
 * parts are assembled explicitly here rather than relying on that behaviour.
 * Using `formatToParts` keeps the locale in charge of field order and
 * separators while letting us normalise the day, and avoids substituting a
 * different locale (e.g. en-NZ) purely to get the desired padding.
 */
const DATE_PART_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", DATE_PART_OPTIONS)
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
