import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = {
  children?: React.ReactNode
  /** Icon-only button — renders without visible text. Supply aria-label for accessibility. */
  icon?: React.ReactNode
  iconOnly?: boolean
  variant?: Variant
  disabled?: boolean
  onClick?: () => void
  /** Accessible label — should always be supplied when iconOnly is true */
  "aria-label"?: string
}

const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * An icon-only button renders no visible text, so it needs an explicit
 * accessible name to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value). If no
 * `aria-label` is supplied we fall back to a generic label so the control is
 * never left anonymous, and warn in development so the omission is caught.
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
  const resolvedAriaLabel = iconOnly ? (ariaLabel ?? ICON_ONLY_FALLBACK_LABEL) : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      `Button: iconOnly buttons render no visible text and require an aria-label ` +
        `to have an accessible name (WCAG 2.2 SC 4.1.2). Falling back to ` +
        `"${ICON_ONLY_FALLBACK_LABEL}", which is not descriptive.`,
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
