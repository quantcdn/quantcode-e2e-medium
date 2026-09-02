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
 * Icon-only buttons render without visible text, so an `aria-label` is required
 * to give them an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * When `iconOnly` is set without an `aria-label`, a fallback name is applied and
 * a development-only warning is emitted.
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
  // An empty or whitespace-only aria-label provides no accessible name, so it is
  // treated the same as a missing one (WCAG 2.2 SC 4.1.2 Name, Role, Value).
  const hasAriaLabel = Boolean(ariaLabel?.trim())

  if (process.env.NODE_ENV !== "production" && iconOnly && !hasAriaLabel) {
    console.warn(
      "Button: `aria-label` is required when `iconOnly` is true — icon-only buttons have no visible text and fail WCAG 2.2 SC 4.1.2 without an accessible name.",
    )
  }

  const accessibleName = iconOnly
    ? hasAriaLabel
      ? ariaLabel
      : typeof children === "string"
        ? children
        : "Button"
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
