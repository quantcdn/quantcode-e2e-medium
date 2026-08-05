/**
 * Date formatting utilities.
 *
 * `dateStyle: "short"` is used rather than explicit day/month/year fields:
 * under `en-AU` the explicit fields pad the day ("01/03/2024") regardless of
 * option order, while `dateStyle: "short"` yields an unpadded day ("1/3/24").
 * Note this also means a 2-digit year.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", { dateStyle: "short" }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
