/**
 * Date formatting utilities.
 *
 * Australian date format is day-first (D/MM/YYYY). The `en-AU` locale orders
 * the fields correctly on its own, but it resolves `day` to `2-digit` even when
 * `numeric` is requested, which yields a leading zero ("01/03/2024"). Building
 * the output from `formatToParts` preserves the locale's field ordering and
 * separators while emitting the day without a leading zero ("1/03/2024").
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
