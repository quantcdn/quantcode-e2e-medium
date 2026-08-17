/**
 * Date formatting utilities.
 */

/** Formats as D/MM/YYYY for the en-AU locale — e.g. 1/03/2024, 15/06/2024. */
export function formatDate(date: Date): string {
  // en-AU pads the day to 2 digits even when `day: "numeric"` is requested, so
  // assemble the parts manually to get an unpadded day while keeping the
  // unambiguous 4-digit year.
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-AU", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  )
  return `${Number(parts.day)}/${parts.month}/${parts.year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
