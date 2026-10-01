import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = {
  children?: React.ReactNode
  /** Icon-only button — renders without visible text. Requires aria-label for accessibility. */
  icon?: React.ReactNode
  iconOnly?: boolean
  variant?: Variant
  disabled?: boolean
  onClick?: () => void
  /** Accessible label — REQUIRED when iconOnly is true */
  "aria-label"?: string
}

/**
 * Button component.
 *
 * An icon-only button has no visible text, so it must carry an explicit
 * `aria-label` to expose an accessible name to assistive technology
 * (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 *
 * If `iconOnly` is set without an `aria-label`, a warning is logged and a
 * generic fallback name is applied so the control is never left nameless.
 * Callers should always pass a meaningful `aria-label`.
 */
export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  let accessibleName = ariaLabel

  if (iconOnly && !accessibleName) {
    accessibleName = typeof children === "string" && children.trim() ? children.trim() : "Button"

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Button: an icon-only button requires an "aria-label" to provide an accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleName}".`,
      )
    }
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleName}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
