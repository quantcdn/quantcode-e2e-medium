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
 * Icon-only buttons render no visible text, so they must be given an
 * `aria-label` describing the action (WCAG 2.2 SC 4.1.2). A development-time
 * warning fires when one is omitted.
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
  // Prefer an explicit aria-label; fall back to string children when the label
  // was omitted. Icon-only buttons render no text, so they must always end up
  // with a non-empty accessible name (WCAG 2.2 SC 4.1.2).
  const rawLabel = ariaLabel ?? (typeof children === "string" ? children : undefined)
  const derivedLabel = rawLabel?.trim() ? rawLabel : undefined
  const accessibleName = iconOnly ? derivedLabel || "Button" : ariaLabel

  if (process.env.NODE_ENV !== "production" && iconOnly && !derivedLabel) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` describing the action " +
        '(WCAG 2.2 SC 4.1.2). Falling back to "Button", which is not a meaningful name.',
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
