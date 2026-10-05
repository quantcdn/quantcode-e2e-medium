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
 * name via `aria-label` to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value).
 *
 * `aria-label` is always forwarded when supplied. For an icon-only button we
 * additionally guarantee a non-empty name: any string `children` is used as a
 * fallback, otherwise a generic "Button" label keeps the control reachable for
 * screen reader users. A development-only warning flags the missing label so
 * the omission is fixed at the call site rather than silently shipped.
 */
function resolveAccessibleName(
  ariaLabel: string | undefined,
  iconOnly: boolean,
  children: React.ReactNode,
): string | undefined {
  if (ariaLabel) return ariaLabel
  if (!iconOnly) return undefined

  if (typeof children === "string" && children.trim() !== "") {
    return children
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). Falling back to \"Button\".",
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
  const accessibleName = resolveAccessibleName(ariaLabel, iconOnly, children)

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
