/**
 * Formats a date as D/MM/YYYY (en-AU day/month order).
 *
 * The day is intentionally left unpadded (e.g. "1/03/2024") because the
 * existing tests require it; the month is zero-padded.
 */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("day").replace(/^0+(?=\d)/, "")}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
