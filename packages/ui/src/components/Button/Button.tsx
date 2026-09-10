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

const FALLBACK_ICON_LABEL = "Button"

/**
 * Button component.
 *
 * An icon-only button renders no visible text, so it must carry an `aria-label`
 * to expose an accessible name to assistive technology (WCAG 2.2 SC 4.1.2
 * Name, Role, Value). When `iconOnly` is set we always emit an `aria-label`:
 * the caller-supplied value, a string child if one is present, or a generic
 * fallback. A development-time warning is issued when no explicit label was
 * given so the omission is caught during authoring rather than by an audit.
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
  let accessibleLabel = ariaLabel

  if (iconOnly && !accessibleLabel) {
    accessibleLabel = typeof children === "string" && children.trim() !== "" ? children : FALLBACK_ICON_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Button: an icon-only button was rendered without an "aria-label". ` +
          `Falling back to "${accessibleLabel}". Provide an explicit aria-label ` +
          `describing the action (WCAG 2.2 SC 4.1.2).`,
      )
    }
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
