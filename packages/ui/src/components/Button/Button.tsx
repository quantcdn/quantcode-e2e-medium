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
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
  ...rest
}: Props) {
  const resolvedAriaLabel = iconOnly ? (ariaLabel ?? "button") : ariaLabel

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      data-variant={variant}
      aria-label={resolvedAriaLabel}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {!iconOnly && children}
    </button>
  )
}
