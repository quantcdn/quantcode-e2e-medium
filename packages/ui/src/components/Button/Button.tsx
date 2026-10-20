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

const FALLBACK_ICON_LABEL = "Button"

function textFromChildren(children: React.ReactNode): string | undefined {
  if (typeof children === "string") return children.trim() || undefined
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    const parts = children
      .map((child) => textFromChildren(child))
      .filter((part): part is string => Boolean(part))
    return parts.length ? parts.join(" ") : undefined
  }
  return undefined
}

/**
 * Button component.
 *
 * An icon-only button has no visible text, so it must expose an accessible name
 * via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). The caller's
 * `aria-label` is always forwarded to the underlying element; when `iconOnly`
 * is set without one we fall back to any text children, then to a generic
 * label, and warn in development so the omission is caught early.
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
  const accessibleName = iconOnly
    ? ariaLabel ?? textFromChildren(children) ?? FALLBACK_ICON_LABEL
    : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] `iconOnly` buttons require an explicit `aria-label` to provide an " +
        `accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleName}".`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleName}
    >
      {icon && (
        <span className="btn-icon" aria-hidden={iconOnly || undefined}>
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
