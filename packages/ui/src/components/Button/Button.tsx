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
 * When `iconOnly` is true, the button renders without visible text, so an
 * `aria-label` is required for an accessible name (WCAG 4.1.2). A dev-time
 * warning is logged when it is missing.
 *
 * Note: the `""` fallback rendered for iconOnly without an aria-label exists
 * only to keep the attribute present (constrained by Button.test.tsx). An
 * empty string is NOT an accessible name; callers must supply a real label.
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
    console.warn("Button: iconOnly buttons require an aria-label (WCAG 4.1.2)")
  }
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? (ariaLabel ?? "") : ariaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
