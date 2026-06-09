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
const _dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
})

export function formatDate(date: Date): string {
  const parts = _dateFormatter.formatToParts(date)
  const p: Record<string, string> = {}
  for (const { type, value } of parts) p[type] = value
  return `${parseInt(p.day)}/${p.month}/${p.year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
