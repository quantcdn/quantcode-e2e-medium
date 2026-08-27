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
 * Icon-only buttons render without visible text, so they must be given an
 * `aria-label` to expose an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * A development-time warning is emitted when one is missing.
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
  const derived = typeof children === "string" ? children : undefined
  const resolvedLabel = ariaLabel ?? (iconOnly ? derived ?? "icon button" : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel && !derived) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2)."
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
