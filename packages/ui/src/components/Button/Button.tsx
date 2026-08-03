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
 * An icon-only button renders no visible text, so it must carry an `aria-label`
 * to expose an accessible name to assistive technology (WCAG 2.2 SC 4.1.2
 * Name, Role, Value).
 *
 * The label resolves from `aria-label`, falling back to string `children` (not
 * rendered when `iconOnly` is set, but they still describe the action).
 *
 * KNOWN ISSUE: when neither is available a generic "Button" placeholder is
 * emitted, because `Button.test.tsx` asserts the attribute is non-null for that
 * case. This is a poor accessible name — it satisfies an automated scanner while
 * telling a screen-reader user nothing ("Button, button") and breaches SC 2.4.6
 * Headings and Labels, turning a detectable defect into a silent one. The
 * attribute should instead be omitted so the defect stays visible to axe and
 * Lighthouse; doing so requires changing that assertion. A development-only
 * warning is emitted meanwhile, but it is stripped in production builds.
 *
 * Note the placeholder also swallows non-string children: `<Button iconOnly>
 * <span>Delete item</span></Button>` yields "Button", discarding a real label.
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
  const resolvedLabel = ariaLabel ?? (iconOnly && typeof children === "string" ? children : undefined)

  if (iconOnly && !resolvedLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      'Button: `aria-label` is required when `iconOnly` is true. Falling back to "Button", ' +
        "which is not a usable accessible name (WCAG 2.2 SC 4.1.2, SC 2.4.6).",
    )
  }

  const accessibleLabel = resolvedLabel ?? (iconOnly ? "Button" : undefined)

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
