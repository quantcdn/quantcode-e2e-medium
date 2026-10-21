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
 * accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly` is
 * set we always emit an `aria-label`: the caller-supplied label if present,
 * otherwise a label derived from string children, otherwise a generic
 * fallback plus a development warning so the missing label is caught early.
 */
function resolveIconOnlyLabel(ariaLabel: string | undefined, children: React.ReactNode): string {
  if (ariaLabel) return ariaLabel
  if (typeof children === "string" && children.trim()) return children.trim()

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }
  return "Button"
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
  const accessibleLabel = iconOnly ? resolveIconOnlyLabel(ariaLabel, children) : ariaLabel

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
