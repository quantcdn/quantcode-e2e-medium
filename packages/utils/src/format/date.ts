/**
 * Date formatting utilities.
 */

/**
 * Format a date in Australian style: D/MM/YYYY (day first, no leading zero on
 * the day, zero-padded month, four-digit year) — e.g. 15/06/2024, 1/03/2024.
 *
 * Field ordering comes from the `en-AU` locale rather than being hard-coded.
 * The `en-AU` data in some ICU builds widens a `numeric` day to `2-digit`, so
 * the day part is un-padded explicitly via `formatToParts` to keep the output
 * stable across runtimes.
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
