/**
 * Date formatting utilities.
 *
 * Formats as D/MM/YYYY for the en-AU locale — day first, no leading zero on
 * the day, four-digit year.
 *
 * The leading zero cannot be removed through options alone: the CLDR short-date
 * pattern for en-AU is `dd/MM/y`, so `day: 'numeric'` is silently coerced to
 * `2-digit` (visible in `resolvedOptions()`). `dateStyle: 'short'` does drop the
 * zero but also degrades the year to two digits. We therefore keep the en-AU
 * locale for correct field ordering and strip the day's leading zero via
 * `formatToParts`.
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
