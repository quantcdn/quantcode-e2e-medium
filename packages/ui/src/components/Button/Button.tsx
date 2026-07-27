import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  children?: React.ReactNode
  /** Icon-only button — renders without visible text. Requires aria-label for accessibility. */
  icon?: React.ReactNode
  iconOnly?: boolean
  variant?: Variant
  disabled?: boolean
  /** Accessible label — REQUIRED when iconOnly is true */
  "aria-label"?: string
}

/**
 * Button component.
 *
 * Accessibility (WCAG 2.2 SC 4.1.2 Name, Role, Value):
 * An icon-only button has no visible text, so it must expose an accessible
 * name via `aria-label`. The supplied `aria-label` is always forwarded to the
 * underlying <button>. When `iconOnly` is set and no label is provided we fall
 * back to the string children (if any) and warn in development, so the control
 * is never left without an accessible name.
 */
export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  "aria-label": ariaLabel,
  ...rest
}: Props) {
  const fallbackLabel = typeof children === "string" ? children : "Button"
  const resolvedLabel = iconOnly ? (ariaLabel ?? fallbackLabel) : ariaLabel

  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn(
      "[Button] `iconOnly` buttons require an explicit `aria-label` to meet WCAG 2.2 SC 4.1.2. " +
        `Falling back to "${fallbackLabel}".`,
    )
  }

  return (
    <button
      {...rest}
      className={`btn btn-${variant}`}
      disabled={disabled}
      aria-label={resolvedLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
