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
 * If one is not supplied we fall back to a generic label so the control is never
 * left nameless, and warn in development so the omission gets fixed at the source.
 *
 * Text buttons deliberately receive no fallback — their accessible name is derived
 * from their content, and an aria-label would clobber it.
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
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to have an accessible name (WCAG 2.2 SC 4.1.2). Falling back to \"Button\".",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? "Button" : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
