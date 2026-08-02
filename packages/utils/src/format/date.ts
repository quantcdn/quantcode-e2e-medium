/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). The `en-AU` short pattern pads
 * the day to two digits (`01/03/2024`), so the day part is emitted via
 * `formatToParts` and un-padded to produce `1/03/2024` while still relying on
 * the locale for field ordering and separators.
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
