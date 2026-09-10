/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). The `en-AU` locale orders the
 * fields correctly, but its ICU pattern zero-pads the day even when
 * `day: "numeric"` is requested, so the day part is un-padded via
 * `formatToParts` to yield `1/03/2024` rather than `01/03/2024`.
 */
const DATE_PART_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return DATE_PART_FORMATTER.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
