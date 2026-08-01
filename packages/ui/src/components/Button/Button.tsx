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
 * `iconOnly` buttons render without visible text, so they rely on `aria-label`
 * for their accessible name (WCAG 2.2 SC 4.1.2). The `aria-label` is always
 * applied to the underlying element, and a generic fallback is used when one is
 * missing so the control is never left nameless. A development-only warning is
 * emitted in that case, since the fallback is not descriptive.
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
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons must be given an `aria-label` so assistive " +
        "technology can announce an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  const resolvedAriaLabel = iconOnly ? (ariaLabel ?? "Button") : ariaLabel

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
