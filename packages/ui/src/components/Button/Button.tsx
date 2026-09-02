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
 * Icon-only buttons render no visible text, so they must carry an explicit
 * accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). `aria-label` is applied to
 * the element when provided; when `iconOnly` is set without one, a fallback is
 * emitted and a development-mode warning flags the missing label at the call site.
 *
 * Text buttons intentionally receive no `aria-label` — their visible text is already
 * the accessible name, and labelling them would override it.
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
  // Prefer the caller's label; for icon-only buttons fall back to string children so
  // the element always exposes an accessible name. Text buttons resolve to undefined,
  // which React omits entirely, leaving the visible text as the accessible name.
  const resolvedAriaLabel =
    ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "Button") : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` for screen reader users (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${resolvedAriaLabel}".`,
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
