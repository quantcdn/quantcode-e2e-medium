/**
 * Date formatting utilities.
 */
export function formatDate(date: Date): string {
  // en-AU's numeric date pattern forces day: "2-digit" (ICU resolves
  // day: "numeric" -> "2-digit"), so strip the day's leading zero via
  // formatToParts to get D/MM/YYYY while keeping the en-AU locale.
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts
    .map((p) => (p.type === "day" ? String(Number(p.value)) : p.value))
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
