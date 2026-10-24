/**
 * Date formatting utilities.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
