/**
 * Date formatting utilities.
 *
 * Australian date convention is day-first (D/MM/YYYY), so field ordering and
 * separators are taken from the `en-AU` locale rather than hard-coded.
 */

const DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

/**
 * Format a date as day-first D/MM/YYYY, e.g. 1 March 2024 -> "1/03/2024".
 *
 * The locale supplies the field order and separators. Parts are reassembled so
 * that `day: "numeric"` is honoured (the en-AU pattern otherwise zero-pads the
 * day), giving an unpadded day with a zero-padded month and four-digit year.
 */
export function formatDate(date: Date): string {
  return DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
