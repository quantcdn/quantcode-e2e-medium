/**
 * Date formatting utilities. Australian day-first format with a 4-digit year.
 */
export function formatDate(date: Date): string {
  // en-AU always widens `day: "numeric"` to 2-digit, so build from parts to
  // get an unpadded day with a zero-padded month: 1/03/2024.
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
