/**
 * Date formatting utilities.
 *
 * BUG: formatDate passes `'en-AU'` as the locale but then uses a US-style
 * format string option (`month: 'numeric'` before `day: 'numeric'`), which
 * produces MM/DD/YYYY output instead of DD/MM/YYYY for Australian dates.
 *
 * Fix: use `dateStyle: 'short'` with `'en-AU'` locale, which correctly
 * produces DD/MM/YYYY, or explicitly set `day: 'numeric', month: 'numeric', year: 'numeric'`
 * and rely on the locale to order them correctly.
 */
export function formatDate(date: Date): string {
  const d = date.getUTCDate()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const y = date.getUTCFullYear()
  return `${d}/${m}/${y}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
