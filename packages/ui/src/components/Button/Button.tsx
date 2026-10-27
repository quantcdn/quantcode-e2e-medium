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

const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). An explicit
 * `aria-label` is always honoured; when one is omitted on an icon-only button
 * the label falls back to any string children, then to a generic label, and a
 * development-time warning is emitted so the omission is caught in review.
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
    accessibleLabel = typeof children === "string" && children.trim().length > 0
      ? children
      : ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Button] An icon-only Button was rendered without an `aria-label`. " +
          `Falling back to "${accessibleLabel}". Provide a descriptive ` +
          "`aria-label` so screen reader users get a meaningful name (WCAG 2.2 SC 4.1.2).",
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
