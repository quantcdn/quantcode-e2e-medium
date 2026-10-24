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
 * Icon-only buttons render no visible text, so they always receive an
 * `aria-label` to guarantee an accessible name (WCAG 2.2 SC 4.1.2).
 * A non-empty explicit `aria-label` is preferred; otherwise a generic
 * label is applied as a last resort with a development warning.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button"

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  let accessibleLabel = ariaLabel && ariaLabel.length > 0 ? ariaLabel : undefined

  if (iconOnly && !accessibleLabel) {
    accessibleLabel = ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an `aria-label` to have an accessible name (WCAG 2.2 SC 4.1.2).",
      )
    }
  }

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
