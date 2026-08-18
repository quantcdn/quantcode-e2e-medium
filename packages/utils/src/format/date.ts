/**
 * Date formatting utilities.
 *
 * Australian date format is day-first (D/MM/YYYY). The `en-AU` locale supplies
 * the correct field ordering, but its ICU pattern pads the day to two digits,
 * so we format to parts and emit the day unpadded — giving `1/03/2024` for
 * 1 March 2024 rather than the ambiguous-looking `01/03/2024`.
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
