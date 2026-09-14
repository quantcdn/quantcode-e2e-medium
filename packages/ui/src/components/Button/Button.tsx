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
 * Icon-only buttons render without visible text, so they must always expose an
 * accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). Callers should pass an
 * `aria-label`; if one is omitted we fall back to a generic label so the control
 * is never nameless, and warn outside production to keep the omission visible.
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
    console.warn("Button: `iconOnly` buttons require an `aria-label` for screen reader users.")
  }

  const resolvedAriaLabel = ariaLabel ?? (iconOnly ? "Button" : undefined)

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedAriaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
