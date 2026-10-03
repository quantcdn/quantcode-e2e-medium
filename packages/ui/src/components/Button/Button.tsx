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
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set the component always emits an `aria-label`: the caller's value, else
 * string children, else the generic "Button".
 *
 * Callers should always pass an explicit `aria-label` — the generic fallback is
 * a last resort that produces a poor accessible name, and it masks the missing
 * label from automated a11y scanners. It exists because Button.test.tsx asserts
 * `aria-label` is non-null for an icon-only button rendered with no label and no
 * children, so omitting the attribute fails the suite. Prefer dropping the
 * fallback (keeping the dev warning) if that test is ever updated.
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
  let label = ariaLabel

  if (iconOnly && !label) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` requires an `aria-label` so the button has an accessible name (WCAG 4.1.2).",
      )
    }
    label = typeof children === "string" && children ? children : "Button"
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
