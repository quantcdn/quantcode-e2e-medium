/**
 * Date formatting utilities.
 *
 * Dates are rendered day-first (D/M/YYYY) per Australian convention, with a
 * 4-digit year. The `en-AU` locale supplies the day-before-month ordering and
 * the `/` separators; we post-process both the day and month parts to strip
 * leading zeros, which `en-AU` would otherwise force (1/3/2024 rather than
 * 01/03/2024). Stripping both keeps the output internally consistent.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) =>
      part.type === "day" || part.type === "month" ? String(Number(part.value)) : part.value,
    )
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
