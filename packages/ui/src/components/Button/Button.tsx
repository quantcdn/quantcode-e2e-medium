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
 * Icon-only buttons render no visible text, so they always emit an `aria-label`
 * to guarantee an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * A dev-only warning is logged when an icon-only button omits `aria-label`,
 * since the fallback ("Button") is not a meaningful description.
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
  const resolvedLabel =
    ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "Button") : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "[Button] `iconOnly` buttons require an explicit `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). Falling back to a generic label.",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
