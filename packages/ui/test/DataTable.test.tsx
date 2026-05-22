import { describe, test, expect, afterEach } from "bun:test"
import { render, fireEvent, cleanup } from "@testing-library/react"
import { DataTable } from "../src/components/DataTable/DataTable"
import React from "react"

const data = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
]

const columns = [
  { key: "name" as const, label: "Name", sortable: true },
  { key: "age" as const, label: "Age", sortable: true },
]

describe("DataTable", () => {
  afterEach(() => cleanup())

  test("renders all rows", () => {
    const { getByText } = render(<DataTable data={data} columns={columns} />)
    expect(getByText("Alice")).toBeDefined()
    expect(getByText("Bob")).toBeDefined()
    expect(getByText("Charlie")).toBeDefined()
  })

  test("sorts ascending on first click", () => {
    const { getAllByRole, getByText } = render(<DataTable data={data} columns={columns} />)
    fireEvent.click(getByText("Name"))
    const cells = getAllByRole("cell")
      .filter((_, i) => i % 2 === 0)
      .map((c) => c.textContent)
    expect(cells).toEqual(["Alice", "Bob", "Charlie"])
  })

  test("sorts descending on second click (stale closure test)", () => {
    const { getAllByRole, getByText } = render(<DataTable data={data} columns={columns} />)
    fireEvent.click(getByText("Name")) // asc
    fireEvent.click(getByText("Name")) // should toggle to desc
    const cells = getAllByRole("cell")
      .filter((_, i) => i % 2 === 0)
      .map((c) => c.textContent)
    // BUG: with stale closure this will still be ascending — test will fail
    expect(cells).toEqual(["Charlie", "Bob", "Alice"])
  })
})
