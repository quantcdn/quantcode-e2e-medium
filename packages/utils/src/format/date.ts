/**
 * Date formatting utilities.
 *
 * Australian date convention is day-before-month (DD/MM/YYYY). The `en-AU`
 * CLDR pattern is `dd/MM/y`, which zero-pads the day ("01/03/2024"). The
 * conventional form leaves the day unpadded ("1/03/2024"), so the day part is
 * rebuilt from `formatToParts` while the locale continues to supply the field
 * ordering and separators.
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