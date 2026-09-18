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

function deriveTextLabel(node: React.ReactNode): string | undefined {
  if (typeof node === "string") {
    const trimmed = node.trim()
    return trimmed === "" ? undefined : trimmed
  }
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) {
    const parts = node.map(deriveTextLabel).filter((p): p is string => Boolean(p))
    return parts.length === 0 ? undefined : parts.join(" ")
  }
  return undefined
}

/**
 * Button component.
 *
 * An icon-only button has no visible text, so it must expose an accessible
 * name via aria-label (WCAG 2.2 SC 4.1.2 Name, Role, Value). The aria-label
 * prop is always forwarded to the rendered <button>. When iconOnly is set and
 * no aria-label is supplied we derive one from the children, falling back to a
 * generic label, and warn in development so the missing label gets fixed.
 *
 * The icon is only marked aria-hidden when the button carries an aria-label to
 * act as its accessible name. Without a label the icon's own text content is
 * left exposed, since it may be the button's only accessible name.
 *
 * No `type` is hard-coded: the browser default (submit) applies so the
 * component stays usable as a form submit button.
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
    accessibleLabel = deriveTextLabel(children) ?? FALLBACK_ICON_LABEL

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: `iconOnly` buttons require an explicit `aria-label` to have a " +
          `meaningful accessible name (WCAG 2.2 SC 4.1.2). Falling back to "${accessibleLabel}".`,
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
      {icon && (
        <span className="btn-icon" aria-hidden={accessibleLabel ? "true" : undefined}>
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
