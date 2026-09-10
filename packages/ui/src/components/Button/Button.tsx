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
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value).
 * The `aria-label` prop is forwarded to the underlying <button>. When
 * `iconOnly` is set without an `aria-label`, a string child is used as a
 * fallback name and a development warning is emitted so the omission is
 * caught before it reaches production.
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
  const fallbackLabel = typeof children === "string" ? children : "button"
  const accessibleName = iconOnly ? ariaLabel ?? fallbackLabel : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] An icon-only Button was rendered without an `aria-label`. " +
        "Icon-only controls must have an accessible name (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${fallbackLabel}".`,
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