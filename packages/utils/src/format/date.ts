/**
 * Date formatting utilities.
 *
 * formatDate returns Australian-style D/MM/YYYY — day not zero-padded, month
 * zero-padded, 4-digit year.
 */
export function formatDate(date: Date): string {
  // en-AU resolves numeric day/month to its dd/MM/y skeleton, which forces a
  // leading zero onto the day (01/03/2024). Ordering is already correct, so
  // rebuild from parts and un-pad the day only — giving 1/03/2024.
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
