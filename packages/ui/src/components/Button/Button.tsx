import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  icon?: React.ReactNode
  iconOnly?: boolean
  variant?: Variant
}

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  "aria-label": ariaLabel,
  ...rest
}: Props) {
  if (iconOnly && !ariaLabel) {
    console.warn("Button: icon-only buttons must have an aria-label for WCAG 4.1.2 compliance.")
  }
  return (
    <button
      className={`btn btn-${variant}`}
      aria-label={iconOnly ? (ariaLabel ?? "") : ariaLabel}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
