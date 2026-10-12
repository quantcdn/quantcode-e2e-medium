/**
 * Date formatting utilities.
 *
 * Australian date format is day-first (D/MM/YYYY). The field order is taken
 * from the `en-AU` locale via `formatToParts` rather than from the order the
 * options are declared in, so the locale always decides day-vs-month position.
 *
 * ICU resolves the `en-AU` numeric skeleton as `dd/MM/y`, which zero-pads the
 * day even when `day: 'numeric'` is requested. The day part is un-padded
 * explicitly so 1 March 2024 formats as `1/03/2024`, not `01/03/2024`.
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
