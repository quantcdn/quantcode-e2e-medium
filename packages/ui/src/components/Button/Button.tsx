import React, { useEffect } from "react"

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
 * Icon-only buttons have no visible text, so an `aria-label` is needed for
 * screen readers (WCAG 2.2 SC 4.1.2). When it is omitted, a fallback label is
 * derived from string children (or "Button") and a dev-only warning is logged.
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
  const label = ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "Button") : undefined)
  const missingLabel = iconOnly && !ariaLabel
  useEffect(() => {
    if (missingLabel && process.env.NODE_ENV !== "production") {
      console.warn("Button: icon-only buttons require an aria-label (WCAG 4.1.2)")
    }
  }, [missingLabel])
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
