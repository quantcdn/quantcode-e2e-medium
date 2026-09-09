/**
 * Date formatting utilities.
 *
 * Australian date format is day-first. Note that `Intl.DateTimeFormat` ignores
 * the order of the option keys and always follows the locale's own pattern, so
 * field ordering is never something we control here.
 */
export function formatDate(date: Date): string {
  // ICU's en-AU numeric pattern is dd/MM/y (zero-padded day) and `day: "numeric"`
  // does not override that padding. We want d/MM/y, so format to parts and strip
  // the day's padding while keeping en-AU ordering, separators and timezone handling.
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
