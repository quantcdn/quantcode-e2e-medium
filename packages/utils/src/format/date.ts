/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). The `en-AU` locale supplies the
 * correct field ordering, so the parts are emitted via `formatToParts` rather
 * than being concatenated manually. ICU widens a `numeric` day to two digits
 * for `en-AU`, so the day is narrowed back to its numeric form to give
 * `1/03/2024` rather than `01/03/2024`.
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
