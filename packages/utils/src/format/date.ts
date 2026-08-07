/**
 * Date formatting utilities.
 *
 * Australian date format is day-first: D/MM/YYYY.
 *
 * Note: `Intl.DateTimeFormat` ignores the order of the option properties — the
 * locale's CLDR pattern decides field ordering, so `en-AU` is already day-first.
 * However ICU silently upgrades `day: "numeric"` to `2-digit` for `en-AU`,
 * producing a zero-padded "01/03/2024". `formatToParts` is used to strip that
 * leading zero from the day while keeping the month zero-padded and the year at
 * four digits — `dateStyle: "short"` would truncate the year to two digits,
 * which is ambiguous for record keeping.
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
