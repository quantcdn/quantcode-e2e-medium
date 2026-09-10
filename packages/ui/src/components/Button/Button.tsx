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

/** Last-resort accessible name for an icon-only button with no author-supplied label. */
const FALLBACK_ICON_ONLY_LABEL = "Button"

/**
 * Button component.
 *
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set and no label is supplied we fall back to a generic label so the
 * control is never left nameless, and warn in development so the caller can
 * supply a meaningful one.
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
  const hasAriaLabel = typeof ariaLabel === "string" && ariaLabel.trim() !== ""
  const resolvedAriaLabel = iconOnly ? (hasAriaLabel ? ariaLabel : FALLBACK_ICON_ONLY_LABEL) : ariaLabel

  if (process.env.NODE_ENV !== "production" && iconOnly && !hasAriaLabel) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to give screen reader " +
        `users an accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${FALLBACK_ICON_ONLY_LABEL}".`,
    )
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
