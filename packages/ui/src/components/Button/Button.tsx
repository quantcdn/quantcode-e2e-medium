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
 * Every button must expose an accessible name to satisfy WCAG 2.2 SC 4.1.2
 * (Name, Role, Value). The name comes from the first available of:
 *
 *   1. an explicit `aria-label`,
 *   2. visible text children,
 *   3. the icon's own text content,
 *   4. a generic fallback, used only for `iconOnly` buttons whose icon is
 *      decorative and therefore hidden from assistive technology.
 *
 * The icon is only marked `aria-hidden` when one of (1) or (2) already supplies
 * a name — hiding it otherwise would leave the button anonymous.
 */
const FALLBACK_LABEL = "Button"

function hasRenderableChildren(children: React.ReactNode): boolean {
  return children !== undefined && children !== null && children !== false && children !== ""
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
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  // Children are only rendered — and so only contribute a name — when not icon-only.
  const showsChildren = !iconOnly && hasRenderableChildren(children)

  // Fall back to a generic name only for explicit icon-only buttons: their icon is
  // treated as decorative, so nothing else can name them. When `iconOnly` is not
  // set the icon stays exposed and provides the name from its own text content.
  const accessibleLabel = iconOnly ? (ariaLabel ?? FALLBACK_LABEL) : ariaLabel

  // Safe to hide the icon only once a label or visible text supplies the name.
  const iconIsDecorative = Boolean(accessibleLabel) || showsChildren

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleLabel}
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
