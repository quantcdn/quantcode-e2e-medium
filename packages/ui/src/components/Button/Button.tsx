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
 * name via `aria-label` (WCAG 2.2 AA SC 4.1.2 Name, Role, Value).
 *
 * `aria-label` is always forwarded to the element. When `iconOnly` is set and
 * no label is supplied we fall back to the string children, then to a generic
 * "Button", so the control is never left without an accessible name. A dev-only
 * warning flags the missing label so it gets fixed at the call site.
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
      "Button: `iconOnly` requires an explicit `aria-label` for screen reader users (WCAG 2.2 AA SC 4.1.2)."
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
