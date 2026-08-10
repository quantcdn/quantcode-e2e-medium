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
 * Icon-only buttons have no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 AA, SC 4.1.2 Name, Role, Value).
 * When `iconOnly` is set and no `aria-label` is supplied we fall back to any
 * string `children` and warn in development, so the control is never shipped
 * without an accessible name.
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
  const accessibleLabel = iconOnly ? (ariaLabel ?? fallbackLabel) : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      `[Button] An icon-only Button was rendered without an "aria-label". ` +
        `Falling back to "${fallbackLabel}". Provide an explicit aria-label to ` +
        `give the button a meaningful accessible name (WCAG 2.2 SC 4.1.2).`,
    )
  }

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
