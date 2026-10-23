/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). The field order in the options
 * object has no bearing on output order — the `en-AU` locale pattern decides
 * that — so the fields are listed in the order they are rendered for clarity.
 *
 * `en-AU` pads the day to two digits by default, so the day part is emitted via
 * `formatToParts` and un-padded to give "1/03/2024" rather than "01/03/2024".
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts.map((part) => (part.type === "day" ? String(Number(part.value)) : part.value)).join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
