/**
 * Date formatting utilities.
 *
 * formatDate renders day-first (D/MM/YYYY). Note that `en-AU` zero-pads the
 * day component, producing "01/03/2024"; `en-GB` with an explicit
 * `day: 'numeric'` gives the un-padded day the app expects ("1/03/2024").
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
