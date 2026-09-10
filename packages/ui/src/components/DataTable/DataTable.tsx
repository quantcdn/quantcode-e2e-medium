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
 * Clicking a sortable column sorts ascending; clicking the same column again
 * toggles to descending. The toggle uses the functional form of setState so it
 * always reads the current direction rather than a value captured when the
 * handler was created — avoiding a stale closure if several updates are
 * queued before the next render.
 */
export function DataTable<T extends Record<string, unknown>>({ data, columns }: Props<T>) {
  const [sort, setSort] = useState<{ key: keyof T | null; dir: SortDir }>({ key: null, dir: "asc" })
  const { key: sortKey, dir: sortDir } = sort

  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }))
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
