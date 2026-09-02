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
 * `iconOnly` buttons render no visible text, so they must carry an `aria-label`
 * to expose an accessible name (WCAG 2.2 SC 4.1.2). A missing label falls back
 * to a generic name and warns in development.
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
      "[Button] `iconOnly` buttons require an `aria-label` for screen reader users (WCAG 2.2 SC 4.1.2).",
    )
  }

  // iconOnly buttons have no visible text, so they must always expose an
  // accessible name. Prefer the explicit label, then string children.
  const accessibleLabel =
    ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "Button") : undefined)

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
