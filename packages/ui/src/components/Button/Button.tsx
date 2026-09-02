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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set without an explicit label we derive one from string `children` where
 * possible, otherwise falling back to a generic name so the button is never
 * left anonymous — warning in development only when nothing meaningful can be
 * derived.
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
  const hasStringChildren = typeof children === "string" && children.length > 0
  const derivedLabel = hasStringChildren ? (children as string) : "Button"

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel && !hasStringChildren) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). Falling back to \"Button\".",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? derivedLabel : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
