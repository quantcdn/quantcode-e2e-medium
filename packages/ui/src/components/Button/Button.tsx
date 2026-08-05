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
 * An icon-only button has no visible text, so it always receives an `aria-label`
 * to guarantee an accessible name (WCAG 2.2 SC 4.1.2). Callers should pass a
 * meaningful `aria-label`; the generic fallback is a last resort only.
 *
 * Buttons with visible text deliberately omit `aria-label` so the visible label
 * remains the accessible name (WCAG 2.2 SC 2.5.3 Label in Name).
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
  const accessibleLabel = iconOnly
    ? ariaLabel ?? (typeof children === "string" ? children : "button")
    : ariaLabel

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
