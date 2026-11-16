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
 * Stopgap: icon-only buttons always render an aria-label attribute and warn in
 * development when none is supplied. An empty label gives no accessible name
 * (WCAG 4.1.2); the proper fix is to make `aria-label` required in the types
 * when `iconOnly` is true.
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
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn("Button: icon-only buttons require an aria-label (WCAG 4.1.2)")
  }
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? "" : undefined)}
    >
      {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
