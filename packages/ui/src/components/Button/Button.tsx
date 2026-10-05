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

function rendersVisibleText(children: React.ReactNode): boolean {
  if (children == null || typeof children === "boolean") return false
  if (typeof children === "string") return children.trim().length > 0
  if (typeof children === "number") return true
  if (Array.isArray(children)) return children.some(rendersVisibleText)
  return true
}

/**
 * Button component.
 *
 * A button with no visible text must still carry an accessible name via
 * `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). The icon is decorative and
 * marked `aria-hidden`, so it never contributes to the name. Whenever no visible
 * text is rendered — `iconOnly`, or an icon with no children — we emit an
 * `aria-label`: the supplied label, a string fallback derived from `children`, or
 * a generic last resort, warning in development so the omission is caught before
 * it ships.
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
  const hasVisibleText = !iconOnly && rendersVisibleText(children)

  if (!accessibleLabel && !hasVisibleText) {
    accessibleLabel =
      typeof children === "string" && children.trim().length > 0 ? children : "Button"

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: this button renders no visible text and requires an explicit " +
          "`aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). " +
          `Falling back to "${accessibleLabel}".`,
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
      {icon && (
        <span className="btn-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
