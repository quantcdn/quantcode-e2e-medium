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
 * Icon-only buttons render no visible text, so they must carry an `aria-label`
 * to expose an accessible name to assistive technology (WCAG 2.2 SC 4.1.2
 * Name, Role, Value). When `iconOnly` is set without a label we fall back to a
 * generic non-empty name so the control is never anonymous, and warn in
 * development so the omission is fixed at the call site.
 */
const FALLBACK_ICON_LABEL = "Button"

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
    typeof process !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !ariaLabel
  ) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible " +
        `name (WCAG 2.2 SC 4.1.2). Falling back to "${FALLBACK_ICON_LABEL}".`,
    )
  }

  const accessibleLabel = ariaLabel ?? (iconOnly ? FALLBACK_ICON_LABEL : undefined)

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
