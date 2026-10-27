/**
 * Date formatting utilities.
 *
 * Australian dates are day-first with an unpadded day and a four-digit year,
 * e.g. 1/03/2024 and 15/06/2024. Intl orders the fields correctly for en-AU
 * but always zero-pads the day, so the day part is unpadded via formatToParts
 * rather than assembling the string by hand (which would hard-code the field
 * order and separator).
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
