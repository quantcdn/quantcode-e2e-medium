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
 * to expose an accessible name to assistive technology (WCAG 2.2 AA SC 4.1.2
 * Name, Role, Value). When `iconOnly` is set an `aria-label` is always rendered:
 * the caller-supplied one where present, otherwise a label derived from string
 * `children`, falling back to a generic label plus a development-only warning so
 * the omission surfaces during development rather than shipping inaccessible.
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
    accessibleLabel = typeof children === "string" ? children : "Button"

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name " +
          `(WCAG 2.2 AA SC 4.1.2). Falling back to "${accessibleLabel}".`,
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
