export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${date.getDate()}/${month}/${date.getFullYear()}`
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
