import React, { useState } from "react"

type SortDir = "asc" | "desc"

type Column<T> = {
  key: keyof T
  label: string
  sortable?: boolean
}

type Props<T extends Record<string, unknown>> = {
  data: T[]
  columns: Column<T>[]
}

/**
 * DataTable with client-side sorting.
 *
 * Sort direction is toggled with the functional form of setState so the
 * handler always reads the committed value rather than the `sortDir` captured
 * when the handler was created. This keeps the toggle correct even when
 * multiple clicks are batched into a single render pass.
 */
export function DataTable<T extends Record<string, unknown>>({ data, columns }: Props<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp = av < bv ? -1 : av > bv ? 1 : 0
        return sortDir === "asc" ? cmp : -cmp
      })
    : data

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
              aria-sort={sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={String(col.key)}>{String(row[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
