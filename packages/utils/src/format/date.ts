/**
 * Date formatting utilities.
 *
 * Australian date format is day-first: D/MM/YYYY (e.g. 1/03/2024, 15/06/2024).
 * The `en-AU` locale orders the fields correctly but its numeric pattern is
 * `dd/MM/y`, which zero-pads the day even with `day: 'numeric'`. We format to
 * parts and strip the day's leading zero so the locale controls ordering and
 * separators while the day stays unpadded.
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
