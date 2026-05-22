/**
 * API client utilities for the web app.
 *
 * BUG: imports `useThrottle` from @e2e/utils, but that hook was renamed to
 * `useDebounce`. This causes a TypeScript error and a runtime crash.
 *
 * Fix: change the import to `useDebounce`.
 */

// BUG: useThrottle no longer exists — was renamed to useDebounce
import { useThrottle } from "@e2e/utils"
import { formatDate, formatAUD } from "@e2e/utils"

export const BASE_URL = process.env.API_URL ?? "http://localhost:3000"

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`)
  return res.json()
}

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`)
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`)
  return res.json()
}

// Re-export formatting utilities used throughout the app
export { formatDate, formatAUD }

// Re-export the debounce hook (currently broken import)
export { useThrottle as useSearchDebounce }
