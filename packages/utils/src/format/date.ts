/**
 * Date formatting utilities.
 *
 * `formatDate` builds an Australian day-first date manually rather than via
 * `Intl.DateTimeFormat`, because the required output has an un-padded day, a
 * zero-padded month and a 4-digit year (e.g. `1/03/2024`, `15/06/2024`) — a
 * combination none of the `en-AU` numeric presets produce.
 */
export function formatDate(date: Date): string {
  const day = date.getDate()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${day}/${month}/${date.getFullYear()}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
