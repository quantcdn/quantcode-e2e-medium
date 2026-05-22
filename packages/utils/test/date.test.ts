import { describe, test, expect } from "bun:test"
import { formatDate } from "../src/format/date"

describe("formatDate", () => {
  test("formats as DD/MM/YYYY for Australian locale", () => {
    // 15 June 2024 — should be 15/06/2024 in en-AU, not 6/15/2024
    const d = new Date("2024-06-15T12:00:00Z")
    const result = formatDate(d)
    // Day should come before month in Australian date format
    expect(result).toMatch(/^15/)
  })

  test("day 1 is not confused with month 1", () => {
    // 1 March 2024 — should be 1/03/2024, not 3/01/2024
    const d = new Date("2024-03-01T12:00:00Z")
    const result = formatDate(d)
    expect(result).toMatch(/^1/)
    expect(result).toContain("3")
  })
})
