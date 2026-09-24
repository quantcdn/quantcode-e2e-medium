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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 *
 * `aria-label` is always forwarded to the underlying element. When `iconOnly`
 * is set and no label is supplied, a placeholder name is rendered so the
 * control is never anonymous to assistive technology, and a development
 * warning is emitted so the missing label is caught before release.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button (missing label)"

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const derivedLabel = typeof children === "string" ? children : undefined
  const accessibleName = iconOnly
    ? (ariaLabel ?? derivedLabel ?? ICON_ONLY_FALLBACK_LABEL)
    : ariaLabel

  if (iconOnly && !ariaLabel && !derivedLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] An icon-only Button was rendered without an `aria-label`. " +
        "Screen reader users will hear a generic name. Provide `aria-label` to satisfy WCAG 2.2 SC 4.1.2.",
    )
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
