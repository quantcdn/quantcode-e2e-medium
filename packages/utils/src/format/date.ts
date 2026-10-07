/**
 * Date formatting utilities.
 *
 * Australian date format is D/MM/YYYY — day first, with an unpadded day.
 * The `en-AU` ICU pattern zero-pads the day ("01/03/2024") no matter which
 * combination of `day`/`month`/`year` options is supplied, so the parts are
 * reassembled here: the locale still determines field ordering and
 * separators, while the day is emitted without a leading zero.
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
