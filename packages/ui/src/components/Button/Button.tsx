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
 * Icon-only buttons have no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set, an `aria-label` is always applied: the supplied label if present,
 * otherwise a fallback derived from string children, with a development-time
 * warning so the missing label is caught before release.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button"

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
    accessibleLabel = typeof children === "string" && children.trim() !== "" ? children : ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: an icon-only button requires an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). " +
          `Falling back to "${accessibleLabel}".`,
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
