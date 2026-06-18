/**
 * Date formatting utilities.
 *
 * Uses formatToParts with explicit numeric fields and the en-AU locale so
 * that Intl supplies Australian field ordering (day/month/year) and the
 * locale's own separators. The day part is rendered without a leading zero
 * (matching en-AU convention) while the year is always 4 digits.
 */
export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
  return formatter
    .formatToParts(date)
    .map((p) => (p.type === "day" ? String(parseInt(p.value, 10)) : p.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
