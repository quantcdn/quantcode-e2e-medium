/**
 * Date formatting utilities.
 */

const AU_DATE_PARTS = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
})

/**
 * Format a date in Australian style as `d/MM/yyyy` (e.g. `1/03/2024`).
 *
 * Field order is taken from the `en-AU` locale (day before month) rather than
 * hard-coded, so the separator and ordering stay correct. Values are then
 * normalised: the day is unpadded, the month is zero-padded to two digits and
 * the year is rendered in full.
 */
export function formatDate(date: Date): string {
  return AU_DATE_PARTS.formatToParts(date)
    .map((part) => {
      switch (part.type) {
        case "day":
          return String(Number(part.value))
        case "month":
          return part.value.padStart(2, "0")
        default:
          return part.value
      }
    })
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
