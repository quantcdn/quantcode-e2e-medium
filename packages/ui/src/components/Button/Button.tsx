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
 * Icon-only buttons have no visible text, so an `aria-label` is required to
 * give them an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). When one
 * is not supplied we fall back to the button's text children, and warn in
 * development so the missing label is caught before it ships.
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
  const fallbackLabel = typeof children === "string" ? children.trim() : ""
  const accessibleName = iconOnly ? ariaLabel || fallbackLabel || "Button" : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      `Button: \`iconOnly\` buttons require an \`aria-label\` for an accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleName}".`,
    )
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
