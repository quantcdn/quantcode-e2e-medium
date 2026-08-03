/**
 * Date formatting utilities.
 *
 * Australian dates are day-first. `formatDate` produces the unpadded short form
 * `D/M/YYYY` — e.g. `1/3/2024`, `15/6/2024`.
 *
 * `en-AU` resolves both `day` and `month` to `2-digit` even when `numeric` is
 * requested, so both fields are rebuilt from `formatToParts` to strip leading
 * zeros. Padding therefore stays consistent across the two fields, while field
 * *ordering* is still left to the locale. Throws `RangeError` on an invalid Date.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
    .formatToParts(date)
    .map((part) =>
      part.type === "day" || part.type === "month" ? String(Number(part.value)) : part.value,
    )
    .join("")
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
