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
 * BUG: When `iconOnly` is true, the button renders without visible text.
 * An `aria-label` is required for screen reader accessibility (WCAG 2.1 SC 4.1.2),
 * but the component does not enforce or warn about its absence.
 *
 * The test in Button.test.tsx checks that an icon-only button has an accessible name.
 * Fix: throw/warn in development when `iconOnly && !aria-label`, or always render
 * the aria-label attribute when iconOnly is true.
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
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      // BUG: aria-label is not applied when iconOnly is true and no ariaLabel is passed
      // The component should enforce aria-label for icon-only buttons
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
