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
 * Icon-only buttons render no visible text, so they must carry an explicit
 * accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). Text buttons derive
 * their name from their visible content and are left without an aria-label so
 * the accessible name always matches the visible label (SC 2.5.3 Label in Name).
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
  const accessibleName =
    ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "Button") : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: `iconOnly` buttons require an explicit `aria-label` for screen reader users (WCAG 2.2 SC 4.1.2).",
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
