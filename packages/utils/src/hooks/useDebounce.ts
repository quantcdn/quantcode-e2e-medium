/**
 * Debounce a value — returns the value only after it has stopped changing
 * for `delay` milliseconds.
 *
 * NOTE: This hook was previously named `useThrottle`. All call sites have
 * been migrated to `useDebounce`; no `useThrottle` export remains.
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
