/**
 * Date formatting utilities.
 *
 * Produces day-first Australian output with an unpadded day and a 4-digit
 * year (e.g. 15/6/2024, 1/3/2024).
 *
 * `dateStyle: 'short'` cannot be used because en-AU renders a 2-digit year
 * ("15/6/24"), and a combined `{ day, month, year }` options object cannot be
 * used because en-AU zero-pads both the day and month ("01/03/2024"). Each
 * field is therefore formatted on its own — where en-AU emits it unpadded —
 * and the parts are reassembled in day/month/year order.
 */
const dayFormatter = new Intl.DateTimeFormat("en-AU", { day: "numeric" })
const monthFormatter = new Intl.DateTimeFormat("en-AU", { month: "numeric" })
const yearFormatter = new Intl.DateTimeFormat("en-AU", { year: "numeric" })
const timeFormatter = new Intl.DateTimeFormat("en-AU", { timeStyle: "short" })

function part(formatter: Intl.DateTimeFormat, date: Date, type: string): string {
  const found = formatter.formatToParts(date).find((p) => p.type === type)
  return found ? found.value : ""
}

export function formatDate(date: Date): string {
  const day = part(dayFormatter, date, "day")
  const month = part(monthFormatter, date, "month")
  const year = part(yearFormatter, date, "year")
  return `${day}/${month}/${year}`
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)}, ${timeFormatter.format(date)}`
}
