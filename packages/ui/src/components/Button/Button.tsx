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

const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * An icon-only button has no visible text, so it must expose an accessible name
 * via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly` is set
 * without an `aria-label`, we fall back to string children (if any) so the button
 * is never nameless, and warn in development so the missing label gets fixed.
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
    accessibleLabel = typeof children === "string" ? children : ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons have no visible text and require an explicit " +
          `\`aria-label\` for screen reader users (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleLabel}".`,
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
