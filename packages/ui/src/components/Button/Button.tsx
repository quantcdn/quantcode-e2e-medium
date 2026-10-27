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
 * When `iconOnly` is true and no `aria-label` is supplied, a fallback accessible
 * name is derived from the `icon` prop (if it is a string) or defaults to "Button",
 * and a warning is logged outside production (WCAG 2.2 SC 4.1.2).
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
      console.warn("Button: icon-only buttons require an aria-label for an accessible name.")
    }
    label = typeof icon === "string" && icon.trim() ? icon.trim() : "Button"
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
