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
 * An icon-only button renders no visible text, so it must carry an explicit
 * accessible name (WCAG 2.2 SC 4.1.2). The `aria-label` prop is always
 * forwarded; when `iconOnly` is set without one we warn in development and
 * fall back to a placeholder that deliberately reads as unfinished, so the
 * omission stays visible to accessibility scanners and audits rather than
 * being masked by a plausible-sounding name.
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
  if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
    console.warn("Button: `iconOnly` requires an `aria-label` to give the button an accessible name.")
  }

  const label = iconOnly ? ariaLabel ?? "Unlabelled button" : ariaLabel

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
