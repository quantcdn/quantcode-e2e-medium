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
 * An icon-only button has no visible text, so it needs an `aria-label` to expose
 * an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). A caller-supplied
 * `aria-label` is always used verbatim. Only when `iconOnly` is set AND no label
 * was supplied do we fall back to the generic `"button"` so the attribute is at
 * least present — that fallback is a last resort, not a substitute for a
 * descriptive label, so it is accompanied by a dev-mode warning.
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
  const missingIconOnlyLabel = iconOnly && !ariaLabel

  if (process.env.NODE_ENV !== "production" && missingIconOnlyLabel) {
    console.warn(
      "Button: an icon-only button has no visible text, so it must be given a " +
        'descriptive `aria-label` to expose an accessible name. Falling back to "button", ' +
        "which gives assistive technology no useful information (WCAG 2.2 SC 4.1.2 Name, Role, Value).",
    )
  }

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={missingIconOnlyLabel ? "button" : ariaLabel}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
