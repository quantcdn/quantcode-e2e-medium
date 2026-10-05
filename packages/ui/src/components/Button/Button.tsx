import React from "react"

type Variant = "primary" | "secondary" | "danger"

type Props = {
  children?: React.ReactNode
  icon?: React.ReactNode
  /** Suppresses `children` so only `icon` renders. Requires `aria-label`. */
  iconOnly?: boolean
  variant?: Variant
  disabled?: boolean
  onClick?: () => void
  /**
   * Accessible label. REQUIRED whenever the button renders no visible text —
   * i.e. when `iconOnly` is set, or when `icon` is used with no text children.
   */
  "aria-label"?: string
}

/** Flatten a React node tree to its visible text, ignoring elements with no text. */
function visibleText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(visibleText).join(" ")
  if (React.isValidElement(node)) {
    return visibleText((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

const warned = new Set<string>()

function warnOnce(message: string): void {
  if (process.env.NODE_ENV === "production" || warned.has(message)) return
  warned.add(message)
  console.warn(message)
}

/**
 * Button component.
 *
 * Every button must expose an accessible name (WCAG 2.2 SC 4.1.2 Name, Role,
 * Value). A button with visible text children gets its name from that text. A
 * button that renders no visible text — `iconOnly`, or `icon` with no text
 * children — has no implicit name, so `aria-label` is required.
 *
 * When that label is missing the component recovers rather than shipping an
 * unnamed control: it derives a name from the text children it was given, and
 * only falls back to the generic "Button" when there is no text to use. Both
 * paths emit a development warning, because a generic name satisfies 4.1.2
 * mechanically while still telling a screen reader user nothing useful.
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
  const childText = visibleText(children).replace(/\s+/g, " ").trim()
  const rendersVisibleText = !iconOnly && childText !== ""

  let accessibleName = ariaLabel

  if (!rendersVisibleText && !accessibleName) {
    accessibleName = childText !== "" ? childText : "Button"
    warnOnce(
      "[Button] A Button rendering no visible text was given no `aria-label`. " +
        `Falling back to "${accessibleName}" — pass an explicit \`aria-label\` ` +
        "describing the action (WCAG 2.2 SC 4.1.2).",
    )
  }

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
