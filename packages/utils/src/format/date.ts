/**
 * Date formatting utilities.
 *
 * Australian date convention is day-first (D/MM/YYYY), with no leading zero
 * padding on the day — e.g. 1/03/2024, 15/06/2024. The `en-AU` locale supplies
 * the field ordering; the day part is un-padded explicitly because ICU pads the
 * day whenever the month is requested as two digits.
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
