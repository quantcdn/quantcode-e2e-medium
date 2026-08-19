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
 * Icon-only buttons render no visible text, so they must carry an explicit
 * `aria-label` to expose an accessible name (WCAG 2.2 SC 4.1.2). Callers that
 * omit it get a development warning and a generic fallback name, so the button
 * is never left with no accessible name at all.
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
  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: `iconOnly` buttons have no visible text and require an explicit " +
        "`aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2)."
    )
  }

  const accessibleName = iconOnly
    ? (ariaLabel ?? (typeof children === "string" ? children : "Button"))
    : ariaLabel

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
