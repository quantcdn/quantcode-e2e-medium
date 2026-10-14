/**
 * Date formatting utilities.
 *
 * formatDate renders Australian-style D/MM/YYYY — day first, with no leading
 * zero on the day. Intl pads a "numeric" day to two digits under en-AU, so the
 * day part is unpadded explicitly via formatToParts while field ordering and
 * separators are left to the locale.
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
