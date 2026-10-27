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
 * An icon-only button renders no visible text, so it must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). Any supplied
 * `aria-label` is always forwarded to the element. When `iconOnly` is set
 * without one, the component warns in development and falls back to string
 * `children` so the control is never left without an accessible name.
 */
function resolveAriaLabel(
  ariaLabel: string | undefined,
  iconOnly: boolean,
  children: React.ReactNode,
): string | undefined {
  if (ariaLabel) return ariaLabel
  if (!iconOnly) return undefined

  const fallback = typeof children === "string" ? children.trim() : ""

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` requires an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  return fallback || "Button"
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
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolveAriaLabel(ariaLabel, iconOnly, children)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
