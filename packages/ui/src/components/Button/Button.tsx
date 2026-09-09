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
 * An icon-only button renders no visible text, so it must carry an explicit
 * `aria-label` to have an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * When `iconOnly` is set without a label we fall back to a placeholder so the
 * button is never left nameless, and warn in development so the caller supplies
 * a meaningful one.
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
  const resolvedAriaLabel =
    ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "button") : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "[Button] iconOnly requires an explicit `aria-label` for an accessible name (WCAG 2.2 SC 4.1.2)."
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
