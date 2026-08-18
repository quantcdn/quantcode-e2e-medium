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
 * An `iconOnly` button renders no visible text, so it has no accessible name
 * unless one is supplied. To satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value) the
 * `aria-label` is always applied when `iconOnly` is set, falling back to a
 * generic label if the caller omitted one. Omitting it warns in development so
 * the missing label is caught before it ships.
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
  const fallbackLabel = typeof children === "string" ? children : "Button"

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${fallbackLabel}".`,
    )
  }

  const accessibleLabel = ariaLabel ?? (iconOnly ? fallbackLabel : undefined)

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
