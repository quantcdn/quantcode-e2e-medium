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
 * Icon-only buttons render no visible text, so an `aria-label` should be
 * supplied (WCAG 4.1.2); a warning is logged and a fallback name is used otherwise.
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
  if (iconOnly && !ariaLabel) {
    console.warn("Button: iconOnly buttons require an aria-label (WCAG 4.1.2)")
  }
  const accessibleName = ariaLabel ?? (iconOnly ? "Icon button" : undefined)
  return (
    <button
      aria-label={accessibleName}
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
