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
 * An icon-only button renders no visible text, so it must expose an accessible
 * name via `aria-label` to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value).
 *
 * When `iconOnly` is set we always emit an `aria-label`: the caller-supplied
 * value if present, otherwise a label derived from string children, falling
 * back to "Button" so the control is never left anonymous to assistive tech.
 * A development-only warning flags the missing label for the developer.
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
  const fallbackLabel = typeof children === "string" ? children : "Button"
  const accessibleLabel = iconOnly ? (ariaLabel ?? fallbackLabel) : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      `Button: an icon-only button requires an explicit "aria-label" for screen ` +
        `reader users (WCAG 2.2 SC 4.1.2). Falling back to "${fallbackLabel}".`,
    )
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
