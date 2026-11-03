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
  title?: string
}

/**
 * Button component.
 *
 * Icon-only buttons need an accessible name (WCAG 2.2 SC 4.1.2). The name is
 * taken from `aria-label`, then `title`, then falls back to "Button" with a
 * development warning.
 */
export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
  title,
}: Props) {
  let accessibleName = ariaLabel
  if (iconOnly && !accessibleName) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Button: icon-only buttons require an aria-label. Falling back to title or \"Button\".")
    }
    accessibleName = title || "Button"
  }
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={accessibleName}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
