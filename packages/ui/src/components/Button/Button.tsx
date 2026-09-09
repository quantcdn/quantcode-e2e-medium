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
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` (WCAG 2.2 SC 4.1.2 Name, Role, Value). When `iconOnly`
 * is set we always emit an `aria-label`: the caller-supplied value when present,
 * otherwise a string derived from `children` as a fallback, and we warn in
 * development so the missing label is caught during authoring.
 *
 * On the non-iconOnly path no `aria-label` is emitted at all — the visible text
 * is the accessible name. Overriding it with a differing label would break
 * WCAG 2.2 SC 2.5.3 (Label in Name) for speech-input users.
 */
const FALLBACK_ICON_LABEL = "Button"

function deriveFallbackLabel(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    const text = String(children).trim()
    if (text) return text
  }
  return FALLBACK_ICON_LABEL
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
  const resolvedLabel = iconOnly ? ariaLabel ?? deriveFallbackLabel(children) : undefined

  const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production"

  if (iconOnly && !ariaLabel && isDev) {
    console.warn(
      "[Button] `iconOnly` buttons require an explicit `aria-label` to satisfy WCAG 2.2 SC 4.1.2. " +
        `Falling back to "${resolvedLabel}".`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
