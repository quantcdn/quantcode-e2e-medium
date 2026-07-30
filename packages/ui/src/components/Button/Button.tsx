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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). An explicit
 * `aria-label` is always forwarded to the DOM element. When `iconOnly` is set
 * without one, we derive a name from string children where possible and
 * otherwise fall back to a generic label so the control is never unnamed.
 */
const DEFAULT_ICON_ONLY_LABEL = "Button"

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const derivedLabel = typeof children === "string" ? children.trim() : ""

  const accessibleLabel =
    ariaLabel ?? (iconOnly ? derivedLabel || DEFAULT_ICON_ONLY_LABEL : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "Button: `iconOnly` buttons should be given an explicit `aria-label` " +
        `describing their action (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleLabel}".`,
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
