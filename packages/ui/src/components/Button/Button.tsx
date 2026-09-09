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
 * An `iconOnly` button renders no visible text, so it must carry an
 * `aria-label` to have an accessible name (WCAG 2.2 SC 4.1.2). Callers that
 * omit one get a dev-mode warning and no substituted name, so the missing
 * label surfaces in accessibility tooling rather than being masked.
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
  const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production"

  if (iconOnly && !ariaLabel && isDev) {
    console.warn(
      "Button: `iconOnly` buttons require an `aria-label` so screen reader users get an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  // Text buttons get `undefined` so React omits the attribute entirely and the
  // accessible name comes from visible text (avoids overriding it — SC 2.5.3).
  //
  // Icon-only buttons prefer an explicit `aria-label`, then string children. If
  // neither exists there is no honest name to use, so we emit an empty
  // `aria-label` rather than inventing one: per the accessible name computation
  // an empty/whitespace `aria-label` is skipped, so the button is correctly
  // reported as unnamed by axe/Lighthouse instead of silently passing.
  const accessibleLabel =
    ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "") : undefined)

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
