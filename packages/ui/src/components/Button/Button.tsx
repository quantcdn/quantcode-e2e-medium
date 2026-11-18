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
 * Icon-only buttons have no visible text, so they must always receive an
 * `aria-label` (WCAG 2.2 SC 4.1.2). The prop type stays optional for
 * backwards compatibility; a missing label is flagged by a development-only
 * console warning.
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
  let label = ariaLabel
  if (iconOnly && !label) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Button: iconOnly buttons require an aria-label (WCAG 4.1.2)")
    }
    // The fallback exists only for the warn path; icon-only buttons should
    // always receive aria-label. An empty label is not an accessible name.
    label = typeof children === "string" ? children : ""
  }
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
