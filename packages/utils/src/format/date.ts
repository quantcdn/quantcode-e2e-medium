/** Formats dates in Australian D/MM/YYYY style (no leading zero on the day). */
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const v = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(v("day"))}/${v("month")}/${v("year")}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
