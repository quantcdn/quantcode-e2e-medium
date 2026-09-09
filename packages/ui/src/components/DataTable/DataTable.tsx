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
 * Clicking a sortable column header sorts by it ascending; clicking the same
 * header again toggles the direction.
 *
 * Sort key and direction are held in a single state object and updated through
 * one functional updater. They must be derived together: deciding whether a
 * click is a "new column" or a "toggle" depends on the current key, so reading
 * either value from the render closure would drop an update whenever two
 * clicks are batched into the same render pass.
 */
type SortState<T> = {
  key: keyof T | null
  dir: SortDir
}

export function DataTable<T extends Record<string, unknown>>({ data, columns }: Props<T>) {
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: "asc" })
  const { key: sortKey, dir: sortDir } = sort

  const handleSort = (key: keyof T) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" },
    )
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
