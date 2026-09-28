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
 * the caller's label if provided, otherwise a string child, otherwise a generic
 * fallback — and we warn in development so the missing label gets fixed.
 *
 * Text buttons deliberately omit `aria-label` so the visible text remains the
 * accessible name (WCAG 2.2 SC 2.5.3 Label in Name).
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
    accessibleLabel = typeof children === "string" && children.trim() ? children : FALLBACK_ICON_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Button] An icon-only button requires an explicit `aria-label` to provide an " +
          `accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleLabel}".`,
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