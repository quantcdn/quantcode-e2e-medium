/**
 * Date formatting utilities.
 *
 * Field order comes from the locale, not from the order of the option keys —
 * ICU ignores option key order, so `en-AU` already yields D/M/Y. The subtlety is
 * that ICU widens `numeric` to `2-digit` when day, month and year are requested
 * together, so both fields come back zero-padded (`01/03/2024`). `formatToParts`
 * is used to unpad the day and the month, leaving the year four digits, which
 * gives the standard Australian D/M/YYYY: `1/3/2024`, `15/6/2024`.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) =>
      part.type === "day" || part.type === "month" ? String(Number(part.value)) : part.value,
    )
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
