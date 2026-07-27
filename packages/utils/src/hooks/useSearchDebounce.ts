/**
 * Debounce a value — returns the value only after it has stopped changing
 * for `delay` milliseconds.
 *
 * NOTE: This hook was previously named `useThrottle`, then `useDebounce`.
 * The public name is now `useSearchDebounce`.
 */
import { useState, useEffect } from "react"

export function useSearchDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
