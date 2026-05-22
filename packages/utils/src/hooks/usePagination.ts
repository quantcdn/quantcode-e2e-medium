import { useState } from "react"

export function usePagination(total: number, pageSize: number) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(total / pageSize)

  return {
    page,
    totalPages,
    next: () => setPage((p) => Math.min(p + 1, totalPages)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
    goTo: (n: number) => setPage(Math.max(1, Math.min(n, totalPages))),
  }
}
