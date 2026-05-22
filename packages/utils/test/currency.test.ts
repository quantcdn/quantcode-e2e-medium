import { describe, test, expect } from "bun:test"
import { formatAUD } from "../src/format/currency"

describe("formatAUD", () => {
  test("formats with dollar sign and cents", () => {
    expect(formatAUD(1234.5)).toBe("$1,234.50")
  })

  test("formats without cents", () => {
    expect(formatAUD(1000, false)).toBe("$1,000")
  })

  test("formats zero", () => {
    expect(formatAUD(0)).toBe("$0.00")
  })
})
