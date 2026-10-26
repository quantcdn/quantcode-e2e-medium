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

function textFromChildren(children: React.ReactNode): string | undefined {
  if (typeof children === "string") return children.trim() || undefined
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    const text = children
      .map((child) => textFromChildren(child) ?? "")
      .join(" ")
      .trim()
    return text || undefined
  }
  return undefined
}

/**
 * Button component.
 *
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value).
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
  const accessibleName = iconOnly ? (ariaLabel ?? textFromChildren(children) ?? "Button") : ariaLabel

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] An icon-only button was rendered without an `aria-label`. " +
        `Falling back to "${accessibleName}", which is not a meaningful accessible name. ` +
        "Pass a descriptive `aria-label` to satisfy WCAG 2.2 SC 4.1.2.",
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
