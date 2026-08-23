import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = {
  children?: React.ReactNode
  icon?: React.ReactNode
  /** Renders without visible text — requires `aria-label` for accessibility. */
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
 * An `iconOnly` button renders no visible text, so it has no accessible name unless one
 * is supplied. `aria-label` is therefore required when `iconOnly` is true
 * (WCAG 2.2 SC 4.1.2 Name, Role, Value). When it is omitted we fall back to string
 * `children` and warn in development — the fallback keeps the control reachable, but
 * callers should always pass a meaningful label.
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
  const fallbackLabel = typeof children === "string" ? children : undefined
  const resolvedLabel = iconOnly ? ariaLabel ?? fallbackLabel ?? "Button" : ariaLabel

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel && !fallbackLabel) {
    console.warn(
      "Button: `iconOnly` requires an `aria-label` so screen readers can announce a " +
        "meaningful name (WCAG 2.2 SC 4.1.2). Falling back to \"Button\".",
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
