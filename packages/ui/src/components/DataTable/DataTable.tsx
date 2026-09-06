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

type SortState<T> = {
  key: keyof T | null
  dir: SortDir
}

/**
 * DataTable with client-side sorting.
 *
 * Sort key and direction are held in a single state atom so the functional
 * updater sees both fields as committed. Splitting them meant the direction
 * updater compared against a render-scoped key, which went stale if the
 * handler ran more than once in a single batched flush.
 *
 * Sortable headers render a real `<button>` so sorting is keyboard operable
 * (WCAG 2.2 SC 2.1.1 Keyboard).
 */
export function DataTable<T extends Record<string, unknown>>({ data, columns }: Props<T>) {
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: "asc" })

  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }))
  }

  const sortKey = sort.key
  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp = av < bv ? -1 : av > bv ? 1 : 0
        return sort.dir === "asc" ? cmp : -cmp
      })
    : data

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              scope="col"
              aria-sort={sort.key === col.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
            >
              {col.sortable ? (
                <button type="button" className="th-sort" onClick={() => handleSort(col.key)}>
                  {col.label}
                </button>
              ) : (
                col.label
              )}
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
