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
 * An icon-only button has no visible text, so it must carry a programmatic
 * accessible name to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value) and
 * SC 2.5.3 (Label in Name). The `aria-label` is always applied when provided,
 * and icon-only buttons fall back to a generic label (plus a development
 * warning) so they are never left completely unnamed.
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
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  const accessibleName = ariaLabel ?? (iconOnly ? "Button" : undefined)

  // Children are only rendered when the button is not icon-only, so they can
  // only contribute a visible name in that case.
  const hasVisibleText =
    !iconOnly && children != null && children !== false && children !== ""

  // The icon counts as decorative only when the button is already named by
  // something else — an aria-label, or visible text. When the icon is the sole
  // content and there is no label, it must stay exposed so it can supply the
  // accessible name, otherwise the button would have none (WCAG 2.2 SC 4.1.2).
  const iconIsDecorative = accessibleName !== undefined || hasVisibleText

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleName}
    >
      {icon && (
        <span className="btn-icon" aria-hidden={iconIsDecorative || undefined}>
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
