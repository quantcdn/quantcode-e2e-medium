/**
 * Date formatting utilities.
 *
 * Australian dates are day-first (D/MM/YYYY). The `en-AU` locale orders the
 * fields correctly, but its numeric day pattern still zero-pads single-digit
 * days (`01/03/2024`), so the day part is rebuilt from `formatToParts` without
 * the leading zero while the locale retains ownership of field order and
 * separators.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
