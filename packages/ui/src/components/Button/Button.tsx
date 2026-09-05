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
 * When `iconOnly` is true the button renders no visible text, so an `aria-label`
 * is required to give it an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * If one is omitted we warn in development and fall back to a generic name so the
 * control is never completely unnamed to screen readers.
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
  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: an `iconOnly` button must be given an `aria-label` so screen " +
        "readers can announce it (WCAG 2.2 SC 4.1.2 Name, Role, Value)."
    )
  }

  const fallback = typeof children === "string" ? children : "Button"
  const accessibleName = ariaLabel ?? (iconOnly ? fallback : undefined)

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
