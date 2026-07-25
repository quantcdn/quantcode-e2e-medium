import React from "react"

type Variant = "primary" | "secondary" | "danger"

type CustomProps = {
  children?: React.ReactNode
  icon?: React.ReactNode
  iconOnly?: boolean
  variant?: Variant
}

type Props = CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  icon,
  iconOnly = false,
  variant = "primary",
  "aria-label": ariaLabel,
  ...rest
}: Props) {
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
