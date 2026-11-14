import React from "react"

type Variant = "primary" | "secondary" | "danger"

const FALLBACK_LABEL = "Button"

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
 * Icon-only buttons render no visible text, so they need an accessible name
 * (WCAG 4.1.2). If `aria-label` is omitted for an icon-only button, a generic
 * fallback label is applied and a warning is logged outside production.
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
  if (iconOnly && !ariaLabel && typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    console.warn("Button: icon-only buttons require an aria-label for accessibility (WCAG 4.1.2).")
  }
  const label = ariaLabel ?? (iconOnly ? FALLBACK_LABEL : undefined)
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
