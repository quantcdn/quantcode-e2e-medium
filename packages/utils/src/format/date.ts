/**
 * Date formatting utilities.
 */

/**
 * Format a date as an Australian-style D/MM/YYYY string, e.g. `1/03/2024`.
 *
 * `Intl.DateTimeFormat` ignores the order of the options keys and lays fields
 * out per the locale, so `en-AU` already yields day-before-month. What it does
 * not give us is an unpadded day: the numeric day/month/year skeleton for
 * `en-AU` resolves to `dd/MM/y`, which zero-pads the day ("01/03/2024"). We
 * therefore assemble from parts so the day carries no leading zero, while
 * keeping the padded month and the full four-digit year.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(part("day"))}/${part("month")}/${part("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
