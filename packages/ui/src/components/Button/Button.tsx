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
 * An icon-only button has no visible text, so it must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set the component always renders an `aria-label`: the caller's label if
 * supplied, otherwise a text fallback derived from `children`. A missing label
 * is reported in development so it is caught before release.
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
  const fallbackLabel = typeof children === "string" ? children.trim() : ""
  const accessibleName = iconOnly ? ariaLabel || fallbackLabel || "Button" : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleName}
    >
      {icon && (
        <span className="btn-icon" aria-hidden={iconOnly || undefined}>
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
