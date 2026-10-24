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
 * An icon-only button renders no visible text, so it must carry an `aria-label`
 * to expose an accessible name to assistive technology (WCAG 2.2 SC 4.1.2
 * Name, Role, Value and SC 1.1.1 Non-text Content).
 *
 * `aria-label` is always applied when provided. For an icon-only button with no
 * explicit label, a string child is used as a fallback, otherwise a generic
 * "Button" label is applied so the control is never left unnamed. A development
 * warning flags the missing label so it can be corrected at the call site.
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
  let accessibleName = ariaLabel

  if (iconOnly && !accessibleName) {
    accessibleName = typeof children === "string" && children.trim() !== "" ? children : "Button"

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Button] An icon-only button requires an explicit `aria-label` to provide an " +
          `accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleName}".`,
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
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
