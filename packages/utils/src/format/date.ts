/**
 * Date formatting utilities.
 *
 * Australian date format is day-first with a non-padded day: 1/03/2024.
 * The `en-AU` skeleton pads the day (`dd/MM/y` -> 01/03/2024), so `en-GB`
 * is used here: it is also day-first but honours `day: 'numeric'`, giving
 * a non-padded day alongside a 2-digit month and 4-digit year.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
