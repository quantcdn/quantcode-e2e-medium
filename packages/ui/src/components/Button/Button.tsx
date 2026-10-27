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
 * An icon-only button has no visible text, so it must carry an `aria-label`
 * to expose an accessible name to assistive technology [WCAG-4.1.2]. When
 * `iconOnly` is set without a label we fall back to any string `children`,
 * then to a generic label, and warn in development so the missing label is
 * fixed at the call site rather than shipping a nameless control.
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
  let resolvedLabel = ariaLabel

  if (iconOnly && !resolvedLabel) {
    resolvedLabel = typeof children === "string" && children.trim() !== "" ? children : ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an explicit `aria-label` to have an accessible name (WCAG 2.2 SC 4.1.2). " +
          `Falling back to "${resolvedLabel}".`,
      )
    }
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
