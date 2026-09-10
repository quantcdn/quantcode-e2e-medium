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

const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * Icon-only buttons render no visible text, so they must carry an explicit
 * accessible name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * Callers should always pass `aria-label` when `iconOnly` is set; if they
 * forget, a fallback name is applied so the control is never anonymous to
 * assistive technology, and a warning is logged outside production.
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
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  const accessibleLabel = iconOnly ? (ariaLabel ?? ICON_ONLY_FALLBACK_LABEL) : ariaLabel

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
