/**
 * Date formatting utilities.
 *
 * Australian date format is day-first: `D/MM/YYYY` (e.g. 1/03/2024, 15/06/2024).
 *
 * The `en-AU` numeric pattern zero-pads the day ("01/03/2024"), so we build the
 * output from `formatToParts` and emit the day without padding while keeping the
 * locale's day-before-month ordering and four-digit year.
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
