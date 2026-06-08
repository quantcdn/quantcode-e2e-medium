/**
 * Date formatting utilities.
 *
 * Produces D/MM/YYYY output for Australian locale — unpadded day, zero-padded
 * month, 4-digit year. e.g. 1 March 2024 → "1/03/2024", 15 June 2024 → "15/06/2024".
 *
 * Note: en-AU with day:"numeric" produces a zero-padded day in this runtime,
 * so we use formatToParts and strip the leading zero from the day component.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const p: Record<string, string> = {}
  for (const part of parts) p[part.type] = part.value
  return `${p.day.replace(/^0/, "")}/${p.month}/${p.year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
