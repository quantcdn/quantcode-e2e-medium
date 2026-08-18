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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). The explicit
 * `aria-label` is always forwarded. When `iconOnly` is set and no label is
 * supplied, we derive one from any string children and fall back to a generic
 * label, warning in development so the omission is caught at build time.
 */
function deriveLabel(children: React.ReactNode): string | undefined {
  if (typeof children === "string" && children.trim() !== "") return children.trim()
  if (typeof children === "number") return String(children)
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
  const accessibleName = ariaLabel ?? (iconOnly ? deriveLabel(children) ?? "Button" : undefined)

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "[Button] `iconOnly` buttons require an explicit `aria-label` to provide an " +
        "accessible name (WCAG 2.2 SC 4.1.2). Falling back to " +
        `"${accessibleName}".`,
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
