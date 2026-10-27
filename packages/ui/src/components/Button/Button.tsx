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

const FALLBACK_ICON_LABEL = "Button"

/**
 * Button component.
 *
 * An icon-only button renders no visible text, so it must carry an `aria-label`
 * to expose an accessible name to assistive technology (WCAG 2.2 SC 4.1.2
 * Name, Role, Value). When `iconOnly` is set the component always emits an
 * `aria-label`: the caller-supplied label if present, otherwise a string
 * fallback plus a development warning so the missing label gets fixed.
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
  let accessibleLabel = ariaLabel

  if (iconOnly && !accessibleLabel) {
    accessibleLabel = typeof children === "string" && children ? children : FALLBACK_ICON_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Button: an icon-only button requires an \`aria-label\` to have an accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleLabel}".`,
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