const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
})

/**
 * Formats a date in Australian order (D/MM/YYYY), e.g. "1/03/2024".
 * Day is non-padded; month is zero-padded.
 */
export function formatDate(date: Date): string {
  const parts = dateFormatter.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
