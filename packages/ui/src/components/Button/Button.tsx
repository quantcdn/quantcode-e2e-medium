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
 * An icon-only button has no visible text, so it must always expose an
 * accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). `aria-label` is
 * applied whenever it is supplied; for icon-only buttons a name is always
 * rendered, falling back to string children and then to "Button", and a
 * development warning is emitted so the missing label gets fixed at source.
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
  let accessibleName = ariaLabel

  if (iconOnly && !accessibleName) {
    accessibleName = typeof children === "string" ? children : "Button"

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an explicit `aria-label` to have a " +
          `meaningful accessible name (WCAG 4.1.2). Falling back to "${accessibleName}".`,
      )
    }
  }

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
