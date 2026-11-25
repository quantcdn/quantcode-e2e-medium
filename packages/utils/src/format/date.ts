/**
 * Date formatting utilities.
 */

/**
 * Formats a date as D/MM/YYYY (en-AU).
 *
 * Intl's en-AU output zero-pads the day (e.g. "01/03/2024"), but the required
 * format has no leading zero on the day and a zero-padded month ("1/03/2024").
 * Intl has no option for that combination, so the parts are assembled manually.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: "day" | "month" | "year"): string => {
    const value = parts.find((p) => p.type === type)?.value
    if (value === undefined) throw new Error(`formatDate: missing "${type}" part`)
    return value
  }
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
