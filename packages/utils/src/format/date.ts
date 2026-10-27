/**
 * Date formatting utilities.
 *
 * `formatDate` produces Australian-style D/MM/YYYY — day first, month
 * zero-padded, four-digit year (e.g. 1 March 2024 -> "1/03/2024").
 *
 * Field ordering is taken from the `en-AU` locale rather than hard-coded, so
 * the separator and sequence stay correct. The day is emitted unpadded, which
 * `day: "numeric"` alone does not guarantee across ICU versions.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
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
