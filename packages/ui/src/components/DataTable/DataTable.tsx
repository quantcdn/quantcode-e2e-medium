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
 * The sort key and direction are held in a single state object and updated with
 * the functional form of setState, so the toggle always derives from the current
 * value rather than one captured in the handler's closure. Keeping them together
 * means the direction is decided from the same snapshot as the key it belongs to,
 * and the updater stays pure — safe under React batching and StrictMode double
 * invocation.
 */
export function DataTable<T extends Record<string, unknown>>({ data, columns }: Props<T>) {
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: "asc" })
  const { key: sortKey, dir: sortDir } = sort

  const handleSort = (key: keyof T) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
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
