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
 * Icon-only buttons render without visible text, so an `aria-label` is needed
 * for screen readers (WCAG 2.2 SC 4.1.2). When none is supplied, a fallback
 * label is applied (string `children`, else "Button") and a warning is logged
 * outside production.
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
  const fallbackLabel = typeof children === "string" && children ? children : "Button"
  const missingLabel = iconOnly && !ariaLabel
  if (missingLabel && process.env.NODE_ENV !== "production") {
    console.warn("Button: icon-only buttons require an aria-label (WCAG 4.1.2)")
  }
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (missingLabel ? fallbackLabel : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
