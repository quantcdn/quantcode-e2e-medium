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
 * When `iconOnly` is set without an explicit label we fall back to any string
 * children, then to a generic label, and warn in development so the missing
 * label is caught at authoring time rather than shipping an unnamed control.
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
  let resolvedAriaLabel = ariaLabel

  if (iconOnly && !resolvedAriaLabel) {
    resolvedAriaLabel = typeof children === "string" && children.trim() ? children.trim() : "Button"

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Button: \`iconOnly\` is set without an \`aria-label\`. Falling back to "${resolvedAriaLabel}". ` +
          "Provide an explicit `aria-label` so the button has a meaningful accessible name (WCAG 2.2 SC 4.1.2).",
      )
    }
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedAriaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
