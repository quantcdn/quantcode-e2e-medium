/**
 * Date formatting utilities.
 *
 * Australian dates are day-first: D/MM/YYYY (e.g. 1/03/2024, 15/06/2024).
 * The `en-AU` locale supplies the correct field ordering and separators, so
 * the parts are emitted in locale order rather than assembled by hand.
 *
 * `en-AU` in some ICU builds zero-pads the day even when `day: "numeric"` is
 * requested, so the day part is normalised to drop any leading zero.
 */
const AU_DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return AU_DATE_FORMAT.formatToParts(date)
    .map((part) => (part.type === "day" ? String(Number(part.value)) : part.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
