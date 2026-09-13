/**
 * Date formatting utilities.
 */
export function formatDate(date: Date): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
      .formatToParts(date)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value]),
  )
  // en-AU zero-pads the day; AU convention writes 1/03/2024, not 01/03/2024
  return `${Number(parts.day)}/${parts.month}/${parts.year}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
