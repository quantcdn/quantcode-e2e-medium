/**
 * Debounce a value — returns the value only after it has stopped changing
 * for `delay` milliseconds.
 *
 * NOTE: This hook was recently renamed from `useThrottle` to `useDebounce`.
 * Any code importing `useThrottle` from this package will break.
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
