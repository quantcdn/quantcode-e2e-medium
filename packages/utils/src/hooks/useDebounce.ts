/**
 * Debounce a value — returns the value only after it has stopped changing
 * for `delay` milliseconds.
 *
 * NOTE: Renamed from `useThrottle`. Exported from the package barrel both as
 * `useDebounce` and as the `useSearchDebounce` alias.
 */
import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
