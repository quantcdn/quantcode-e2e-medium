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
 * Icon-only buttons have no visible text, so they rely entirely on `aria-label`
 * for their accessible name (WCAG 2.2 SC 4.1.2). When `iconOnly` is set without
 * an `aria-label`, this component warns in development and falls back to a
 * generic label so the control is never left unnamed.
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
    console.warn("Button: `iconOnly` buttons require an `aria-label` for screen readers (WCAG 2.2 SC 4.1.2).")
  }

  const resolvedLabel = ariaLabel ?? (iconOnly ? "Button" : undefined)

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
