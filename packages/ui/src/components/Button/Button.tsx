import React, { useEffect } from "react"

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
 * An icon-only button has no visible text, so it needs an `aria-label` to give
 * it an accessible name (WCAG 2.2 SC 4.1.2 Name, Role, Value). The label is
 * always applied when `iconOnly` is set: an explicit `aria-label` is used when
 * provided, otherwise we fall back to string children, then to a generic
 * "Button" so the control is never left unnamed. A development warning flags
 * the missing label so it gets fixed at the call site.
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
  const isMissingLabel = iconOnly && !accessibleName

  if (isMissingLabel) {
    accessibleName = typeof children === "string" && children.trim() !== "" ? children : "Button"
  }

  useEffect(() => {
    if (!isMissingLabel) return
    if (process.env.NODE_ENV === "production") return

    console.warn(
      "Button: `iconOnly` buttons have no visible text and require an `aria-label` " +
        "to expose an accessible name (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${accessibleName}".`,
    )
  }, [isMissingLabel, accessibleName])

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleName}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
