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
 * An icon-only button has no visible text, so it must carry an accessible name
 * via aria-label to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value). The caller's
 * aria-label is always applied; when iconOnly is set and no label is supplied we
 * fall back to any string children, then to a generic name, and warn in
 * development so the missing label is caught during build rather than by a
 * screen reader user. The icon itself is decorative once the button is labelled,
 * so it is hidden from assistive technology (WCAG 2.2 SC 1.1.1).
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
  const fallbackLabel = typeof children === "string" && children.trim() ? children.trim() : "Button"
  const accessibleLabel = iconOnly ? (ariaLabel ?? fallbackLabel) : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      `Button: an icon-only button requires an explicit "aria-label" to have an accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleLabel}".`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleLabel}
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
