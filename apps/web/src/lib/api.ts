/**
 * API client utilities for the web app.
 *
 * The debounce hook is imported from @e2e/utils under its current name
 * (`useDebounce`) and re-exported as `useSearchDebounce` to preserve the
 * existing public API of this module.
 */

import { useDebounce } from "@e2e/utils"
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

// Re-export the debounce hook under its established public name
export { useDebounce as useSearchDebounce }
