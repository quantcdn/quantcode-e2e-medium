import { describe, test, expect } from "bun:test"

describe("api module", () => {
  test("imports without error", async () => {
    // This will fail if the import in api.ts is broken (useThrottle doesn't exist)
    const mod = await import("../src/lib/api")
    expect(mod.BASE_URL).toBeDefined()
    expect(typeof mod.fetchUsers).toBe("function")
  })

  test("useSearchDebounce is exported", async () => {
    const mod = await import("../src/lib/api")
    expect(typeof mod.useSearchDebounce).toBe("function")
  })
})
