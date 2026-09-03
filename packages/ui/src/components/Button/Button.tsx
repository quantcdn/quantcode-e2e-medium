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
 * An icon-only button has no visible text, so it must expose an accessible
 * name via `aria-label` to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value).
 * When `iconOnly` is set without an `aria-label`, the component warns in
 * development and falls back to any string children, or a generic label, so
 * the control is never left without an accessible name.
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
  let label = ariaLabel

  if (iconOnly && !label) {
    label = typeof children === "string" ? children : "Button"
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` requires an `aria-label` for screen reader users " +
          `(WCAG 2.2 SC 4.1.2). Falling back to "${label}".`,
      )
    }
  }

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
