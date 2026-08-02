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
 * Icon-only buttons render no visible text, so they must carry an `aria-label` to
 * expose an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). A fallback label
 * is applied when `iconOnly` is set without one, and development builds warn so the
 * missing label is caught before release.
 *
 * The fallback is deliberately scoped to `iconOnly`: adding a synthetic `aria-label`
 * to a text button would override its visible text and breach SC 2.5.3 Label in Name.
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
  const fallbackLabel = typeof children === "string" ? children : "button"
  const resolvedAriaLabel = ariaLabel ?? (iconOnly ? fallbackLabel : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn("Button: `iconOnly` buttons require an explicit `aria-label` (WCAG 2.2 SC 4.1.2).")
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedAriaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
