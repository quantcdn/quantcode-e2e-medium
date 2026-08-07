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
 * An icon-only button has no visible text, so it needs an `aria-label` to expose
 * an accessible name to assistive technology (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * The label is applied to the element whenever it is supplied, and a generic
 * fallback keeps icon-only buttons from being announced as unnamed. The fallback
 * is a last resort only — a development warning fires so the missing label is
 * caught at the call site, where a meaningful description can be given.
 *
 * The fallback is deliberately not applied to text buttons: an `aria-label` there
 * would override the visible text and break WCAG 2.2 SC 2.5.3 Label in Name.
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
      "Button: an icon-only button needs a descriptive `aria-label` to have an " +
        "accessible name (WCAG 2.2 SC 4.1.2). Falling back to a generic label.",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? (ariaLabel ?? "button") : ariaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
