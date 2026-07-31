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
 * Fallback accessible name for an icon-only button whose author supplied no
 * `aria-label`. This is a last-resort floor so the control is never left with no
 * accessible name at all (WCAG 2.2 AA SC 4.1.2) — it is deliberately generic and
 * is NOT a substitute for a meaningful label, hence the development warning.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * Accessibility: an icon-only button has no visible text, so its accessible name
 * must come from `aria-label` (WCAG 2.2 AA SC 4.1.2 Name, Role, Value). For
 * buttons that do render text we leave `aria-label` unset so the visible label
 * remains the accessible name — overriding it would break SC 2.5.3 (Label in
 * Name).
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
      "Button: `iconOnly` buttons have no visible text, so they require an " +
        "`aria-label` describing the action (WCAG 2.2 AA SC 4.1.2). Falling back " +
        `to "${ICON_ONLY_FALLBACK_LABEL}", which is not a meaningful label.`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? ICON_ONLY_FALLBACK_LABEL : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
