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
 * An icon-only button renders no visible text, so it must carry an accessible
 * name or screen readers announce it as an unlabelled button (WCAG 2.2 AA
 * SC 4.1.2 Name, Role, Value). The name is resolved from the explicit
 * `aria-label`, falling back to string children, and finally to a generic
 * label so the attribute is never absent — Button.test.tsx asserts that an
 * icon-only button always exposes one. A development warning flags the
 * fallback case so the missing label is caught before release.
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
    accessibleName = typeof children === "string" ? children : FALLBACK_ICON_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an `aria-label` to give screen reader " +
          `users an accessible name (WCAG 2.2 AA SC 4.1.2). Falling back to "${accessibleName}".`,
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
