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
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 AA SC 4.1.2 Name, Role, Value). A
 * caller-supplied `aria-label` always wins; when none is given we fall back to
 * a generic label so the attribute is never absent, and warn in development so
 * the missing label is caught before it ships.
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
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an explicit `aria-label` to meet WCAG 2.2 AA SC 4.1.2. " +
        `Falling back to "${ICON_ONLY_FALLBACK_LABEL}", which is not a meaningful accessible name.`,
    )
  }

  const resolvedAriaLabel = iconOnly ? (ariaLabel ?? ICON_ONLY_FALLBACK_LABEL) : ariaLabel

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
