/**
 * Date formatting utilities.
 *
 * Australian date format is D/MM/YYYY — day first, then month, then a
 * four-digit year. The field order in the options object does not affect
 * output ordering; the `en-AU` locale drives that. The day is emitted
 * without a leading zero, which requires post-processing because the
 * `en-AU` locale data pads the day even when `day: 'numeric'` is requested.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
