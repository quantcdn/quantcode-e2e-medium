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
 * Neutral last-resort accessible name. Deliberately generic: guessing a
 * purpose-specific label would mis-announce the control (e.g. calling a
 * delete button "Add to favourites").
 */
const GENERIC_ICON_ONLY_LABEL = "Button"

/** Labels already warned about, so the dev warning fires once per label. */
const warnedLabels = new Set<string>()

/**
 * Button component.
 *
 * Icon-only buttons render no visible text, so they must expose an accessible
 * name via `aria-label` to satisfy WCAG 2.2 SC 4.1.2 (Name, Role, Value).
 * An explicit `aria-label` is always used as given. When one is missing on an
 * icon-only button we fall back to string `children`, else a generic label, so
 * the control is never left unnamed — and warn in development, since only the
 * author can supply a label that describes what the button actually does.
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
  const fallbackLabel = typeof children === "string" && children.trim() !== "" ? children : GENERIC_ICON_ONLY_LABEL
  const accessibleLabel = ariaLabel ?? (iconOnly ? fallbackLabel : undefined)

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production" && !warnedLabels.has(fallbackLabel)) {
    warnedLabels.add(fallbackLabel)
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` describing the action (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${fallbackLabel}".`,
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
