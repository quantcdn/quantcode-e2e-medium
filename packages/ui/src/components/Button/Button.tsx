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
 * Last-resort accessible name for an icon-only button whose caller omitted
 * `aria-label`. Guarantees the button is never nameless (WCAG 2.2 SC 4.1.2),
 * but it is deliberately generic — callers are warned to supply a real label.
 */
const FALLBACK_ICON_LABEL = "Button"

/**
 * Button component.
 *
 * Icon-only buttons have no visible text, so their accessible name must come
 * from `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). Buttons with visible
 * text take their name from that text and are left unlabelled, so the visible
 * label remains part of the accessible name (SC 2.5.3 Label in Name).
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
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an explicit `aria-label` describing the action (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${FALLBACK_ICON_LABEL}", which is not a meaningful accessible name.`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? (ariaLabel ?? FALLBACK_ICON_LABEL) : ariaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
