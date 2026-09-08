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
 * Derives an accessible name from string-like children. Returns undefined when
 * the children contain no usable text (elements, null, booleans, whitespace).
 */
function textFromChildren(children: React.ReactNode): string | undefined {
  if (typeof children === "string" || typeof children === "number") {
    const text = String(children).trim()
    return text.length > 0 ? text : undefined
  }
  if (Array.isArray(children)) {
    const text = children
      .map((child) => textFromChildren(child as React.ReactNode))
      .filter((part): part is string => part !== undefined)
      .join(" ")
      .trim()
    return text.length > 0 ? text : undefined
  }
  return undefined
}

/**
 * Button component.
 *
 * An icon-only button renders no visible text, so it needs an explicit
 * `aria-label` to expose an accessible name (WCAG 2.2 SC 4.1.2). When one is not
 * supplied, fall back to any text content in `children` before resorting to the
 * generic "button" label, which conveys nothing beyond the element's own role.
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
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? (iconOnly ? (textFromChildren(children) ?? "button") : undefined)}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
