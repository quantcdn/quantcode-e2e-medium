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
  /** Optional title; used as the fallback accessible name for iconOnly buttons without aria-label */
  title?: string
}

/**
 * Button component.
 *
 * When `iconOnly` is true the button renders without visible text, so it needs an
 * accessible name (WCAG 2.2 SC 4.1.2). If `aria-label` is omitted, a development-time
 * console.warn is emitted (not in production) and the accessible name falls back
 * to the `title` prop, or the generic "Button" if no title is set.
 */
export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  disabled = false,
  onClick,
  title,
  "aria-label": ariaLabel,
}: Props) {
  const missingLabel = iconOnly && !ariaLabel

  React.useEffect(() => {
    if (missingLabel && process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an `aria-label` for an accessible name (WCAG 4.1.2). Falling back to a generic name.",
      )
    }
  }, [missingLabel])

  const accessibleName = ariaLabel ?? (iconOnly ? title || "Button" : undefined)

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={accessibleName}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
