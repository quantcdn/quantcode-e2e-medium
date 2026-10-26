/**
 * Date formatting utilities.
 */
const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
})

export function formatDate(date: Date): string {
  return dateFormatter
    .formatToParts(date)
    .map((part) => {
      if (part.type === "day") return String(Number(part.value))
      if (part.type === "month") return part.value.padStart(2, "0")
      return part.value
    })
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
