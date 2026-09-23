/**
 * Date formatting utilities.
 *
 * `formatDate` produces Australian day-first dates (D/MM/YYYY) with an
 * unpadded day. The `en-AU` CLDR data coerces `day: 'numeric'` to 2-digit,
 * so the day part is stripped of its leading zero via `formatToParts`.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  })
    .formatToParts(date)
    .map((p) => (p.type === "day" ? String(Number(p.value)) : p.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
