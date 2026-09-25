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

/**
 * Button component.
 *
 * An icon-only button has no visible text, so it must carry an `aria-label` to
 * expose an accessible name to assistive technology (WCAG 2.2 SC 4.1.2
 * Name, Role, Value).
 *
 * An explicitly passed `aria-label` is always forwarded, whether or not the
 * button is icon-only. A button with visible text derives its accessible name
 * from its content by default, so when a caller overrides that name it must
 * keep the visible text within the label (WCAG 2.2 SC 2.5.3 Label in Name).
 *
 * If `iconOnly` is set without an `aria-label`, the component falls back to any
 * string children and then to a generic label so the button is never left
 * unnamed, and warns in development so the omission is caught early.
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
  let accessibleName: string | undefined = ariaLabel?.trim() || undefined

  if (iconOnly) {
    const childText = typeof children === "string" ? children.trim() : ""
    accessibleName = ariaLabel?.trim() || childText || FALLBACK_ICON_LABEL

    if (process.env.NODE_ENV !== "production" && !ariaLabel?.trim()) {
      console.warn(
        "[Button] `iconOnly` buttons require an explicit `aria-label` to provide an " +
          `accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleName}".`,
      )
    }
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
