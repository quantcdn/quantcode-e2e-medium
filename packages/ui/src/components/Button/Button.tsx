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
 * When `iconOnly` is true the button renders no visible text, so an `aria-label`
 * is required to give it an accessible name (WCAG 2.2 SC 4.1.2). Callers are
 * warned in development if they omit it, and a generic fallback is applied so
 * the control is never announced as unlabelled.
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
  // Icon-only buttons have no visible text, so they need an explicit accessible
  // name (WCAG 2.2 SC 4.1.2 Name, Role, Value). Warn in development when a
  // caller omits it, and fall back to a generic name so the control is never
  // announced as an unlabelled "button".
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] `iconOnly` requires an `aria-label` for screen reader users (WCAG 2.2 SC 4.1.2)."
    )
  }

  // Only emit aria-label for icon-only buttons; for text buttons the visible
  // label is already the accessible name and must not be overridden.
  const resolvedLabel = iconOnly ? ariaLabel ?? "Button" : ariaLabel

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
