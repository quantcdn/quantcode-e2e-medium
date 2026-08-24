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

/** Fallback accessible name for an icon-only button with no explicit aria-label. */
const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * An `aria-label` passed by the caller is always forwarded to the underlying
 * <button>. When `iconOnly` is true there is no visible text to act as the
 * accessible name, so a label is mandatory under WCAG 2.2 SC 4.1.2 (Name, Role,
 * Value). If the caller omits it we warn in development and fall back to a
 * generic label so the control is never left without an accessible name.
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
  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: `iconOnly` buttons must be given an `aria-label` to provide an " +
        "accessible name (WCAG 2.2 SC 4.1.2). Falling back to " +
        `"${ICON_ONLY_FALLBACK_LABEL}".`,
    )
  }

  const accessibleLabel = ariaLabel ?? (iconOnly ? ICON_ONLY_FALLBACK_LABEL : undefined)

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