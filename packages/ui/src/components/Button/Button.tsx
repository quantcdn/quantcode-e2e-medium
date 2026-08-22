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

/** Fallback accessible name used when an icon-only button is missing an `aria-label`. */
const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * An icon-only button renders no visible text, so it must carry an `aria-label`
 * to expose an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). Callers
 * should always pass one; when they don't we apply a generic fallback so the
 * control is never nameless, and warn in development so the omission is fixed
 * at the call site.
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
  const missingIconOnlyLabel = iconOnly && !ariaLabel

  if (missingIconOnlyLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: an icon-only button requires an `aria-label` so screen readers can " +
        `announce it (WCAG 2.2 SC 4.1.2). Falling back to "${ICON_ONLY_FALLBACK_LABEL}".`,
    )
  }

  const accessibleLabel = iconOnly ? ariaLabel ?? ICON_ONLY_FALLBACK_LABEL : ariaLabel

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
