import { describe, test, expect } from "bun:test"
import { render } from "@testing-library/react"
import { Button } from "../src/components/Button/Button"
import React from "react"

describe("Button", () => {
  test("renders with text", () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText("Click me")).toBeDefined()
  })

  test("icon-only button has an accessible name via aria-label", () => {
    const { getByRole } = render(<Button iconOnly icon={<span>★</span>} aria-label="Add to favourites" />)
    const btn = getByRole("button")
    // The button must have an accessible name — aria-label must be applied to the element
    expect(btn.getAttribute("aria-label")).toBe("Add to favourites")
  })

  test("icon-only button without aria-label still renders (but should warn)", () => {
    // This test documents the current broken behaviour — the button renders
    // but has no accessible name, which fails WCAG 4.1.2
    const { getByRole } = render(<Button iconOnly icon={<span>★</span>} />)
    const btn = getByRole("button")
    // After the fix, this should pass — the aria-label should be present
    // For now this test is asserting the DESIRED state (will fail until fixed)
    expect(btn.getAttribute("aria-label")).not.toBeNull()
  })
})
