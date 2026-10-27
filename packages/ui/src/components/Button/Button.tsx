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
 * An icon-only button renders no visible text, so it must expose an
 * `aria-label` to have an accessible name (WCAG 2.2 SC 4.1.2 Name, Role,
 * Value). When `iconOnly` is set without an explicit label we fall back to the
 * string children, then to a generic name, so the control is never anonymous
 * to assistive technology — and warn outside production so the omission gets
 * fixed at the call site.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button"

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  let accessibleName = ariaLabel

  if (iconOnly && !accessibleName) {
    accessibleName = typeof children === "string" && children.trim() !== "" ? children : ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an explicit `aria-label` to meet WCAG 2.2 SC 4.1.2. " +
          `Falling back to "${accessibleName}".`,
      )
    }
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
