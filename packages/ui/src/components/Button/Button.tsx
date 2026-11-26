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
 * When `iconOnly` is true the button has no visible text, so an `aria-label`
 * is required for an accessible name (WCAG 4.1.2). A dev-only warning is
 * logged when it is missing or empty.
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
  if (
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !(ariaLabel && ariaLabel.trim())
  ) {
    console.warn("Button: `aria-label` is required when `iconOnly` is true (WCAG 4.1.2).")
  }
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      // The "" fallback is a placeholder so the attribute is always present for
      // icon-only buttons; callers MUST pass a real label (WCAG 4.1.2).
      aria-label={ariaLabel ?? (iconOnly ? "" : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
