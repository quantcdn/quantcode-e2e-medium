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
 * Icon-only buttons render no visible text, so they must carry an `aria-label`
 * to expose an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 *
 * Callers should always pass an explicit, meaningful `aria-label` when using
 * `iconOnly`. A development-only warning is emitted when it is missing, and a
 * generic fallback is applied so the button is never left with no accessible
 * name at all.
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
    console.warn(
      "Button: `iconOnly` buttons require an explicit `aria-label` for an accessible name (WCAG 2.2 SC 4.1.2)."
    )
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
