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
 * The sort key and direction are held in a single state object and updated via
 * the functional form of setState, so a toggle always reads the committed value
 * rather than the `sortDir` captured when the handler was created. Previously
 * two toggles dispatched in the same React batch both observed the same stale
 * direction and collapsed into a single toggle. Keeping key and direction in one
 * object also means they can never be applied out of step with each other.
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
