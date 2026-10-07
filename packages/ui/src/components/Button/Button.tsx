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
 * An icon-only button has no visible text, so it needs an explicit accessible
 * name to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value). The `aria-label` is
 * always forwarded to the element. When `iconOnly` is set without a label we
 * warn in development and fall back to a generic name, so the control is never
 * left completely unnamed for screen reader users.
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
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  const accessibleName = iconOnly ? (ariaLabel ?? ICON_ONLY_FALLBACK_LABEL) : ariaLabel

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
