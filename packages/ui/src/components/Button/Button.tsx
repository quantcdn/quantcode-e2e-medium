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

const ICON_ONLY_FALLBACK_LABEL = "Button"

/**
 * Button component.
 *
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). This component
 * always applies an `aria-label` when `iconOnly` is set:
 *
 *  1. the explicit `aria-label` prop, if provided;
 *  2. otherwise the `children` when they are a plain string;
 *  3. otherwise a generic fallback, accompanied by a development warning so the
 *     missing label is surfaced to the developer rather than shipped silently.
 *
 * For buttons with visible text no `aria-label` is applied, so the visible
 * label remains the accessible name (WCAG 2.2 SC 2.5.3 Label in Name).
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
  let accessibleLabel = ariaLabel

  if (iconOnly && !accessibleLabel) {
    accessibleLabel = typeof children === "string" && children.trim() ? children.trim() : ICON_ONLY_FALLBACK_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Button] An icon-only Button was rendered without an `aria-label`. " +
          `Falling back to "${accessibleLabel}". Pass an explicit \`aria-label\` ` +
          "describing the action to meet WCAG 2.2 SC 4.1.2.",
      )
    }
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}