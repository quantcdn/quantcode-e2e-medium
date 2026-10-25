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
 * Icon-only buttons render without visible text, so they must expose an
 * accessible name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 * When `iconOnly` is set we always emit an `aria-label`, falling back to the
 * string content of `children` and then a generic label, and warn in
 * development so the missing label is caught at the source.
 */
const ICON_ONLY_FALLBACK_LABEL = "Button"

function deriveIconOnlyLabel(ariaLabel: string | undefined, children: React.ReactNode): string {
  if (ariaLabel) return ariaLabel
  if (typeof children === "string" && children.trim()) return children.trim()
  if (typeof children === "number") return String(children)
  return ICON_ONLY_FALLBACK_LABEL
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
  const resolvedLabel = iconOnly ? deriveIconOnlyLabel(ariaLabel, children) : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] An icon-only Button was rendered without an `aria-label`. " +
        "Provide one so screen reader users get a meaningful name (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${resolvedLabel}".`,
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
