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
 * Deliberately conspicuous: a missing label should be obvious in an audit,
 * a snapshot diff, or a screen-reader pass rather than masked by a
 * plausible-looking name.
 */
const FALLBACK_ICON_LABEL = "Unlabelled button"

const warnedLabels = new Set<string>()

function warnMissingLabel(fallback: string) {
  if (process.env.NODE_ENV === "production") return
  if (warnedLabels.has(fallback)) return
  warnedLabels.add(fallback)
  console.warn(
    "[Button] iconOnly buttons require an `aria-label` for an accessible name (WCAG 2.2 SC 4.1.2). " +
      `Falling back to "${fallback}".`,
  )
}

/**
 * Button component.
 *
 * Icon-only buttons have no visible text, so they always carry an `aria-label`
 * to provide an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). A label
 * is strongly recommended; when one is missing a development-only warning is
 * emitted and a conspicuous fallback name is applied so the control is never
 * left unnamed.
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
  let accessibleName = ariaLabel

  if (iconOnly && !accessibleName) {
    accessibleName = typeof children === "string" && children.trim() ? children : FALLBACK_ICON_LABEL
    warnMissingLabel(accessibleName)
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleName}
    >
      {icon && (
        <span className="btn-icon" aria-hidden={iconOnly || undefined}>
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </button>
  )
}
