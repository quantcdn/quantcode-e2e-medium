const DATE_FIELDS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}

function formatDateParts(date: Date, extra?: Intl.DateTimeFormatOptions): string {
  const opts = extra ? { ...DATE_FIELDS, ...extra } : DATE_FIELDS
  const parts = new Intl.DateTimeFormat("en-AU", opts).formatToParts(date)
  return parts
    .map((p) => (p.type === "day" ? String(parseInt(p.value, 10)) : p.value))
    .join("")
}

export function formatDate(date: Date): string {
  return formatDateParts(date)
}

export function formatDateTime(date: Date): string {
  return formatDateParts(date, { hour: "2-digit", minute: "2-digit" })
}
