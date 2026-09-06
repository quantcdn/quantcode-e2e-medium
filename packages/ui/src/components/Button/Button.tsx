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
 * `aria-label` is always forwarded to the underlying element. An icon-only
 * button has no visible text, so it must still expose an accessible name
 * (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly` is set without an
 * `aria-label` the component warns outside production and falls back to a
 * generic label rather than rendering a nameless control.
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
    console.warn("Button: `iconOnly` requires an `aria-label` for an accessible name (WCAG 4.1.2)")
  }

  const accessibleName = iconOnly ? ariaLabel ?? "Button" : ariaLabel

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
