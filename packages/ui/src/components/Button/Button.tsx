import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = {
  children?: React.ReactNode
  /** Icon-only button — renders without visible text. Should have an aria-label for accessibility. */
  icon?: React.ReactNode
  iconOnly?: boolean
  variant?: Variant
  disabled?: boolean
  onClick?: () => void
  /** Accessible label — expected when iconOnly is true (a fallback is used with a dev warning if omitted) */
  "aria-label"?: string
}

/**
 * Button component.
 *
 * When `iconOnly` is true the button renders no visible text, so it needs an
 * accessible name (WCAG 2.2 SC 4.1.2). Provide `aria-label`; if it is missing,
 * string children are used as the label, falling back to "Button", and a
 * warning is logged in development.
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
    label = typeof children === "string" && children.trim() ? children : "Button"
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Button: icon-only button is missing an aria-label; falling back to "${label}". Provide an aria-label for screen reader users.`,
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
