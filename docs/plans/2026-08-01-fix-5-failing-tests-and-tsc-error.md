# Fix plan — 5 failing tests + 1 tsc error

**Date:** 2026-08-01
**Branch:** `quantcode/e2e-tier3-2301-1785624453`
**Verify with:** `bun run test` and `bun run typecheck`
**Constraint:** source files only — do NOT edit any file under a `test/` directory.

## Status: all fixes pre-verified

Applied to a scratch copy of the repo, then reverted. Result: **13 pass / 0 fail** (was 8 pass / 5 fail),
and `tsc --noEmit --types bun-types,react` clean. The four edits below are exactly what was validated.

Baseline failures confirmed:

| # | Test | Cause |
|---|------|-------|
| 1 | `api.test.ts` — both tests | `SyntaxError: export 'useSearchDebounce' not found in '@e2e/utils'` + `TS2305` |
| 2 | `Button.test.tsx` — 2 aria-label tests | `aria-label` never applied to `<button>` |
| 3 | `date.test.ts` — "day 1 not confused with month 1" | returns `01/03/2024`, expected `/^1/` |
| 4 | `DataTable.test.tsx` — "sorts descending" | PASSES, but latent stale closure is real (see item 4) |

---

## 1. `apps/web/src/lib/api.ts` — renamed hook

**Canonical name:** the hook is `useDebounce`, defined at `packages/utils/src/hooks/useDebounce.ts:10`
and re-exported from `packages/utils/src/index.ts:1`. It was renamed from `useThrottle`.
`useSearchDebounce` is **not** a name in `packages/utils` — it is the app-local alias `apps/web` exposes.

**Alignment check (grep for `useThrottle`, `useDebounce`, `useSearchDebounce`):** only `api.ts` needs
changing. `packages/utils` is already internally consistent; no other consumer imports the old name.
Remaining `useThrottle` hits are comments only. **Two lines** in `api.ts` must change — fixing only the
import leaves the re-export broken, which is what produces the runtime `SyntaxError`.

**Edit A — line 10-11.** Current:

```ts
// BUG: useThrottle no longer exists — was renamed to useDebounce
import { useThrottle } from "@e2e/utils"
```

Replace with:

```ts
import { useDebounce } from "@e2e/utils"
```

**Edit B — line 31-32.** Current:

```ts
// Re-export the debounce hook (currently broken import)
export { useThrottle as useSearchDebounce }
```

Replace with:

```ts
// Re-export the debounce hook under the app-local name
export { useDebounce as useSearchDebounce }
```

Also update the stale `BUG:` block at lines 4-7 of the file docstring, which no longer describes the code.

---

## 2. `packages/ui/src/components/Button/Button.tsx` — accessible name

Both tests require `btn.getAttribute("aria-label")` to be non-null. Test 1 passes `aria-label="Add to
favourites"` and expects it verbatim. Test 2 passes **no** `aria-label` and still expects non-null — so a
warning alone is insufficient; a fallback value must be rendered. The prop is already destructured as
`ariaLabel` (line 35) but never reaches the DOM.

**Edit A — insert after the destructuring block (after line 36, `}: Props) {`), before `return (`:**

```tsx
  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "Button: `iconOnly` buttons must be given an `aria-label` so assistive " +
        "technology can announce an accessible name (WCAG 2.2 SC 4.1.2).",
    )
  }

  const resolvedAriaLabel = iconOnly ? (ariaLabel ?? "Button") : ariaLabel
```

**Edit B — lines 38-44.** Current:

```tsx
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      // BUG: aria-label is not applied when iconOnly is true and no ariaLabel is passed
      // The component should enforce aria-label for icon-only buttons
    >
```

Replace with:

```tsx
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={resolvedAriaLabel}
    >
```

Non-icon buttons are unaffected: `resolvedAriaLabel` is `undefined` when `iconOnly` is false, and React
omits `undefined` attributes — so "renders with text" keeps its text-content accessible name. Update the
`BUG:` docstring at lines 20-26 to describe the enforced behaviour.

> **A11y note (WCAG 2.2 SC 4.1.2 / 2.5.3):** the `"Button"` fallback satisfies the test but is a
> generic, non-descriptive name — a genuine a11y smell. It exists to make the missing-label case
> *loud in dev* rather than silently nameless. The console warning is the real remediation signal.
> If the team prefers strictness over the fallback, the better long-term design is a discriminated
> union on `Props` making `"aria-label"` **required** when `iconOnly: true`, turning this into a
> compile-time error. That changes the public type surface, so I have **not** included it here —
> worth raising separately.

---

## 3. `packages/utils/src/format/date.ts` — day-first, no leading zero

**The in-file docstring fix suggestion is wrong — do not follow it.** I probed Bun's ICU directly:
`en-AU` already ignores explicit field order, so reordering `day`/`month` changes nothing, and
`dateStyle: 'short'` truncates the year to 2 digits.

| Options (`en-AU`) | 15 Jun 2024 | 1 Mar 2024 | All 3 assertions |
|---|---|---|---|
| current `month,day,year` numeric | `15/06/2024` | `01/03/2024` | FAIL `/^1/` |
| docstring's `day,month,year` numeric | `15/06/2024` | `01/03/2024` | FAIL `/^1/` |
| `dateStyle: 'short'` | `15/6/24` | `1/3/24` | passes, but **2-digit year** |
| **`formatToParts` + manual assembly** | **`15/06/2024`** | **`1/03/2024`** | **PASS** |

The current output `01/03/2024` is *already* day-first; the real defect is only the zero-padded **day**.
All three assertions across both tests must hold: `/^15/`, `/^1/`, and `.toContain("3")`. Only manual
assembly gives an unpadded day with a padded month and 4-digit year.

**Edit — lines 12-19.** Current:

```ts
export function formatDate(date: Date): string {
  // BUG: explicit field order overrides locale ordering — produces M/D/YYYY not D/M/YYYY
  return new Intl.DateTimeFormat("en-AU", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
```

Replace with:

```ts
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""

  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}
```

Verified `D/MM/YYYY`: `15/06/2024`, `1/03/2024`, `25/12/2024`, `9/09/2024`. Compiles under `--strict`.
Replace the incorrect lines 1-11 docstring. Leave `formatDateTime` alone — it is untested and unaffected.

---

## 4. `packages/ui/src/components/DataTable/DataTable.tsx` — latent stale closure: REAL, fix it

**Answer to the question asked: the bug is genuine, the test is just too weak to catch it.**

`DataTable.tsx:34` is `setSortDir(sortDir === "asc" ? "desc" : "asc")` — it reads `sortDir` captured
from the render that created the handler.

**Why the test passes anyway:** the two `fireEvent.click` calls are in *separate* `act()` scopes.
Each `fireEvent` flushes its update and re-renders synchronously, so click 2 runs against a **fresh**
closure where `sortDir === "asc"` is correct. The bug needs two updates in **one** batch to surface.

**How it bites in production** — any of these regress to "stuck ascending", with no test failing:
- Two clicks inside one React 18 auto-batched tick (impatient double-click, or one `act(() => { th.click(); th.click() })`).
- Any programmatic caller invoking `handleSort` twice before a paint.
- Wrapping `handleSort` in `useCallback` — a very likely future perf change — freezes the closure permanently and breaks toggling on *every* second click.

So this is a correctness time bomb, not a false positive. Fix it now; it is a two-line change with no
behaviour change to the passing tests (re-verified: still green after the edit).

**Edit — lines 31-39.** Current:

```tsx
  // BUG: stale closure — sortDir is captured at handler creation time
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc") // BUG: reads stale sortDir
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }
```

Replace with:

```tsx
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }
```

Update the `BUG:` docstring at lines 16-26. `sortKey === key` on line 33 is a render-derived comparison
rather than a queued update and is safe as-is.

**Out of scope but worth noting:** the `<th>` sort control is a click handler on a non-interactive
`<th>` — not keyboard focusable or operable, failing WCAG 2.2 SC 2.1.1. Proper fix is a `<button>`
inside the `<th>`. Not required by any failing test; flagging for follow-up.

---

## Summary

| File | Change | Fixes |
|---|---|---|
| `apps/web/src/lib/api.ts` | `useThrottle` → `useDebounce` on **both** import (L11) and re-export (L32) | 2 tests + TS2305 |
| `packages/ui/src/components/Button/Button.tsx` | render `aria-label` with iconOnly fallback + dev warning | 2 tests |
| `packages/utils/src/format/date.ts` | `formatToParts` manual `D/MM/YYYY` assembly | 1 test |
| `packages/ui/src/components/DataTable/DataTable.tsx` | functional `setSortDir(prev => …)` | latent bug, no test change |

**Not in scope / do not "fix":** the four `TS2307: Cannot find module 'bun:test'` errors are a
`tsconfig.json` issue (`bun-types` is installed but no `"types"`/`"compilerOptions.types"` entry
includes it) affecting **test** files only. Adding `"types": ["bun-types"]` to `tsconfig.json` clears
them, but that is a config change beyond the reported single tsc error (`TS2305` in `api.ts`) — raise
separately rather than bundling it in.
