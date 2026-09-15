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
 * When `iconOnly` is true the button renders no visible text, so it always
 * resolves an accessible name (WCAG 2.2 SC 4.1.2) and warns in development if
 * no explicit `aria-label` was supplied. Text buttons take their accessible
 * name from their content and get no `aria-label`.
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
  // Icon-only buttons render no visible text, so they must always expose an
  // accessible name (WCAG 2.2 SC 4.1.2). Prefer the explicit aria-label, fall
  // back to string children, then to a generic label so the button is never
  // left nameless. Labelled text buttons get their name from their content.
  const resolvedAriaLabel = iconOnly
    ? ariaLabel ?? (typeof children === "string" ? children : "Button")
    : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] `iconOnly` requires an explicit `aria-label` for WCAG 2.2 SC 4.1.2. " +
        "Falling back to a generic label — pass `aria-label` to describe the action.",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedAriaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
