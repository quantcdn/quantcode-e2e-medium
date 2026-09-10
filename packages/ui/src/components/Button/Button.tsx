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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value).
 *
 * `aria-label` is always forwarded to the underlying element. When `iconOnly`
 * is set and no label is supplied we fall back to any plain-text `children`,
 * then to a generic "Button" label, so the control is never left unnamed. A
 * development-only warning flags the missing label so it gets fixed at source.
 */
function textFromChildren(children: React.ReactNode): string | undefined {
  const text = React.Children.toArray(children)
    .filter((child): child is string | number => typeof child === "string" || typeof child === "number")
    .join(" ")
    .trim()

  return text.length > 0 ? text : undefined
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
  const accessibleName = iconOnly ? (ariaLabel ?? textFromChildren(children) ?? "Button") : ariaLabel

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      `Button: an icon-only button requires an explicit \`aria-label\` for screen reader users (WCAG 2.2 SC 4.1.2). ` +
        `Falling back to "${accessibleName}".`,
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
