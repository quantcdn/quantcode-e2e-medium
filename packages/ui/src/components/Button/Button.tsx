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
 * Icon-only buttons render no visible text, so they need an explicit
 * `aria-label` to expose an accessible name (WCAG 2.2 SC 4.1.2 Name, Role,
 * Value). When one is not supplied we fall back to string `children` if
 * present, then to a generic label, and warn in development.
 *
 * For text buttons the resolved label is normally `undefined`, so React omits
 * the attribute entirely and the visible text remains the accessible name.
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
  const textChild = typeof children === "string" && children.length > 0 ? children : undefined
  const resolvedLabel = iconOnly ? (ariaLabel ?? textChild ?? "Button") : ariaLabel

  if (
    typeof process !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    iconOnly &&
    !ariaLabel &&
    !textChild
  ) {
    console.warn("Button: `iconOnly` requires an explicit `aria-label` to meet WCAG 2.2 SC 4.1.2.")
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
