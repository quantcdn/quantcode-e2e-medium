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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). A caller-supplied
 * `aria-label` always wins. When one is omitted for an icon-only button we fall
 * back to string children, then to a generic label, and warn outside production
 * so the missing label is caught in development rather than by end users.
 */
const DEFAULT_ICON_ONLY_LABEL = "Button"

function resolveAriaLabel(
  ariaLabel: string | undefined,
  iconOnly: boolean,
  children: React.ReactNode,
): string | undefined {
  if (ariaLabel) return ariaLabel
  if (!iconOnly) return undefined

  if (typeof children === "string" && children.trim() !== "") {
    return children.trim()
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: icon-only buttons require an explicit `aria-label` for screen " +
        `readers (WCAG 2.2 SC 4.1.2). Falling back to "${DEFAULT_ICON_ONLY_LABEL}".`,
    )
  }

  return DEFAULT_ICON_ONLY_LABEL
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
