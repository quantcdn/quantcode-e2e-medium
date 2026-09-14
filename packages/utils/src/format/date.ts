/**
 * Date formatting utilities.
 */

/**
 * Format a date as a day-first Australian short date, e.g. `1/3/2024`.
 *
 * Note: for `en-AU`, ICU coerces `day: "numeric"` to `"2-digit"`, so a plain
 * Intl call zero-pads both day and month (`01/03/2024`). `dateStyle: "short"`
 * avoids the padding but truncates the year to two digits. We therefore format
 * the parts explicitly and drop the leading zero from both the day and the
 * month while keeping a 4-digit year.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((p) => (p.type === "day" || p.type === "month" ? String(Number(p.value)) : p.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
