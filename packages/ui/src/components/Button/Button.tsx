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
 * When `iconOnly` is true the button has no visible text, so an `aria-label`
 * is required to give it an accessible name (WCAG 4.1.2). If it is missing,
 * a console warning is emitted and an empty `aria-label` attribute is rendered.
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
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
      console.warn(
        "Button: an accessible name is required for icon-only buttons. Provide an `aria-label` prop (WCAG 4.1.2)."
      )
    }
  }, [iconOnly, ariaLabel])

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? "" : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
