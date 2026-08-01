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
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set without an explicit `aria-label`, a fallback label is applied so the
 * control is never nameless, and a development-time warning is emitted so the
 * caller fixes it properly.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button"

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const resolvedLabel = iconOnly
    ? ariaLabel ??
      (typeof children === "string" ? children : undefined) ??
      ICON_ONLY_FALLBACK_LABEL
    : ariaLabel

  if (
    iconOnly &&
    !ariaLabel &&
    typeof process !== "undefined" &&
    process.env.NODE_ENV !== "production"
  ) {
    console.warn(
      "[Button] `iconOnly` was set without an `aria-label`. Icon-only buttons " +
        "must have an accessible name (WCAG 2.2 SC 4.1.2). Falling back to " +
        `"${ICON_ONLY_FALLBACK_LABEL}".`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
