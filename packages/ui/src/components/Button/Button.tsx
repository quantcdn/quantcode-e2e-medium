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
 * An icon-only button renders no visible text, so it must expose an
 * accessible name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * When `iconOnly` is set we always emit an `aria-label`: the caller's label
 * if supplied, otherwise a string derived from `children` as a fallback, and
 * a development-time warning so the missing label is caught during review.
 */
function deriveLabel(children: React.ReactNode): string | undefined {
  if (typeof children === "string" || typeof children === "number") {
    const text = String(children).trim()
    return text.length > 0 ? text : undefined
  }
  return undefined
}

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
    accessibleLabel = deriveLabel(children) ?? "Button"
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Button] `iconOnly` buttons require an explicit `aria-label` to meet WCAG 2.2 SC 4.1.2. " +
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
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
