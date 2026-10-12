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
 * An icon-only button has no visible text, so it needs an `aria-label` to carry
 * an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly` is
 * set the label is always applied: the caller's `aria-label` when supplied,
 * otherwise a fallback derived from any text children so the control is never
 * left nameless. A development warning flags the missing label so the caller
 * can fix it at the source.
 */
function resolveIconOnlyLabel(ariaLabel: string | undefined, children: React.ReactNode): string {
  if (ariaLabel) return ariaLabel
  if (typeof children === "string" && children.trim()) return children.trim()
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
  const label = iconOnly ? resolveIconOnlyLabel(ariaLabel, children) : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      `Button: icon-only buttons require an explicit \`aria-label\` for screen reader users (WCAG 2.2 SC 4.1.2). Falling back to "${label}".`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
