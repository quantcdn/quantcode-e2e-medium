# Fix plan — failing tests + type errors (bun TS monorepo)

Date: 2026-08-18
Branch: `quantcode/e2e-tier3-2222-1787024917`
Scope: source + config only. **No test files modified. No dependencies added.**

## Verification method

All edits below were applied to a throwaway copy (`/tmp/sbx`) and verified with
`bun test` (root), `bun run test`, per-package `bun test`, and `bunx tsc --noEmit`.
The real working tree was never modified (`git status` clean).

**Verified end state:** `13 pass / 0 fail` across 5 files, `tsc --noEmit` exit 0.

Baseline before fixes: `4 pass / 9 fail`, tsc reports 5 errors.

---

## Files you must NOT touch (test files)

| File | Status |
|---|---|
| `apps/web/test/api.test.ts` | DO NOT MODIFY |
| `packages/utils/test/date.test.ts` | DO NOT MODIFY |
| `packages/utils/test/currency.test.ts` | DO NOT MODIFY |
| `packages/ui/test/Button.test.tsx` | DO NOT MODIFY |
| `packages/ui/test/DataTable.test.tsx` | DO NOT MODIFY |

`packages/ui/test/setup.ts` lives under `test/` but is **infrastructure, not a test**
(it only calls `GlobalRegistrator.register()`). It needs **no change** — it is already
correct. It just isn't being loaded. See edit 3.

---

## Corrections to the stated problem brief

Two assumptions in the brief do not hold. Read these before implementing.

### Correction A — the root `bunfig.toml` `environment` key does nothing

Root `bunfig.toml` currently contains:

```toml
[test]
environment = "happy-dom"
```

`environment` is **not a recognised Bun `[test]` option**. Bun has no
`testEnvironment`-style switch (that's a Jest/Vitest concept); DOM registration in Bun
is done exclusively via `preload`. Proven with an isolated probe:

| bunfig `[test]` content | `typeof document` |
|---|---|
| *(none)* | `undefined` — fail |
| `environment = "happy-dom"` | `undefined` — **fail (key is inert)** |
| `preload = [".../setup.ts"]` | `"object"` — pass |

So the key is a red herring. It can be left in place harmlessly or removed; it is
`preload` that must be added.

### Correction B — the DataTable "stale closure" test PASSES unfixed

The brief states this test will fail once the DOM works. It does not. Verified against
**unmodified** `DataTable.tsx` with the DOM preloaded:

```
bun test packages/ui/test/DataTable.test.tsx --preload ./packages/ui/test/setup.ts
 3 pass  0 fail
```

Reason: the two `fireEvent.click(...)` calls are separate events. React flushes state
and **re-renders between them**, so the second click runs a *newly created* `handleSort`
closure that already sees `sortDir === "asc"`. Stale-closure bugs of this shape only
manifest when multiple updates are batched inside a single event/tick.

The code is still latently wrong and edit 5 fixes it — but treat it as **correctness
hardening, not a test fix**. Fixing it does not change the pass count. It is the right
change regardless: the functional-update form is correct under React 18 automatic
batching and will not regress if the handler is ever called twice in one tick.

Net: the DOM config fix (edit 3) alone turns 6 of the 9 failures green.

---

## Edits

### 1. `apps/web/src/lib/api.ts` — reconcile the renamed hook

The exported name in `packages/utils` is **`useDebounce`** — confirmed at
`packages/utils/src/hooks/useDebounce.ts:10` and re-exported at
`packages/utils/src/index.ts:1`. `useThrottle` does not exist anywhere in the package.

`apps/web/test/api.test.ts:13` asserts `typeof mod.useSearchDebounce === "function"`,
so the **public alias `useSearchDebounce` must be preserved** — only the underlying
imported name changes.

**Line 10–11** — before:

```ts
// BUG: useThrottle no longer exists — was renamed to useDebounce
import { useThrottle } from "@e2e/utils"
```

after:

```ts
import { useDebounce } from "@e2e/utils"
```

**Line 32** — before:

```ts
export { useThrottle as useSearchDebounce }
```

after:

```ts
export { useDebounce as useSearchDebounce }
```

Fixes: `SyntaxError: export 'useSearchDebounce' not found in '@e2e/utils'` (both
`api.test.ts` tests) and `api.ts(11,10): error TS2305`.

Optional tidy: the stale `BUG:`/`(currently broken import)` comments in the file header
and at line 31 describe a bug that no longer exists — worth deleting.

---

### 2. `packages/utils/src/format/date.ts` — day without leading zero, month padded

Root cause is **not** field ordering, contrary to the in-file comment at line 13. In
Bun's ICU, `en-AU` *resolves* `day: "numeric"` up to `2-digit` regardless of the order
the options are written:

```
en-AU {month:numeric, day:numeric, year:numeric} -> 01/03/2024   resolvedOptions: day=2-digit
en-AU {day:numeric, month:numeric, year:numeric} -> 01/03/2024   resolvedOptions: day=2-digit
```

Reordering alone changes nothing. The locale's own pattern forces the pad.

`date.test.ts` requires day `/^1/` (unpadded) **and** the string to contain `"3"`, while
the sibling test requires `/^15/`. `dateStyle: "short"` gives `1/3/24` — unpadded day
but a 2-digit **year**, losing `YYYY`. So build the string from parts.

**Lines 12–19** — before:

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

after:

```ts
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ""
  return `${Number(get("day"))}/${get("month")}/${get("year")}`
}
```

`Number(...)` strips the ICU-applied day pad; month keeps its 2-digit form.

Verified output: `15/06/2024`, `1/03/2024`, `31/12/2024`, `9/01/2024`, `5/10/2024`.
Both `date.test.ts` assertions pass; `en-AU` day-before-month ordering is retained.

**Non-regression checked:**
- `formatDateTime` (line 21) — untouched, no test covers it, still `15/6/24, 12:00 pm`.
- `currency.test.ts` — different module (`format/currency.ts`), untouched, 3/3 pass.

Rejected alternative: switching the locale to `en-GB`/`en-NZ` (which happen to emit
`1/03/2024`). It produces the right bytes today but is semantically wrong for an AU
codebase and is a silent behaviour change riding on another locale's ICU pattern.
Keeping `en-AU` and normalising explicitly is intention-revealing and ICU-stable.

Also update the now-inaccurate file-header comment (lines 1–11), which misdiagnoses the
cause as field ordering.

---

### 3. `bunfig.toml` (root) — register the DOM when running from root **[highest impact]**

Root cause: **Bun reads `bunfig.toml` from the current working directory only.** It does
not discover or merge per-package `bunfig.toml` files based on the location of each test
file. So `packages/ui/bunfig.toml` (`preload = ["./test/setup.ts"]`) applies **only** when
cwd is `packages/ui` — which is why `cd packages/ui && bun test` gets a DOM but
`bun test` from root does not. Root's inert `environment` key (Correction A) provides
nothing, so `document` is undefined and `@testing-library/react`'s `render` throws at
`pure.js:256` (`baseElement = document.body`).

**Full file** — before:

```toml
[test]
environment = "happy-dom"
```

after:

```toml
[test]
environment = "happy-dom"
preload = ["./packages/ui/test/setup.ts"]
```

Notes:
- The path is **relative to the bunfig's directory (repo root)** — must be
  `./packages/ui/test/setup.ts`, not `./test/setup.ts`.
- Leave `packages/ui/bunfig.toml` **as is** so `cd packages/ui && bun test` keeps working.
  Both configs are then correct for their own cwd. Verified: 6/6 pass locally in
  `packages/ui`, 13/13 from root.
- `environment` is retained only to keep the diff minimal; it has no effect and may be
  dropped.
- No test file is touched. `setup.ts` needs no edit.
- Registering happy-dom globally for *all* root tests (including the non-DOM utils/web
  tests) is harmless — those suites pass either way, and it matches what the existing
  `package.json` `test` script already does via `--preload`.

**Dependency check — nothing to install.** Already present at the root and resolvable:

| Package | Version | Declared |
|---|---|---|
| `happy-dom` | ^14.0.0 | root devDeps + `packages/ui` devDeps |
| `@happy-dom/global-registrator` | 14.12.3 (installed) | root devDeps |
| `jsdom` | **not installed** | — |

Use happy-dom. Do **not** introduce jsdom.

Fixes all 6 `ReferenceError: document is not defined` failures (3 Button + 3 DataTable),
of which 4 then pass immediately and 2 Button tests proceed to a real assertion
failure — addressed in edit 4.

Consistency note (no change required): `package.json:11`'s `test` script already passes
`--preload ./packages/ui/test/setup.ts`, so `bun run test` worked while bare `bun test`
did not. After this edit both paths behave identically. The redundant `--preload` flag
in the script can optionally be dropped once bunfig covers it.

---

### 4. `packages/ui/src/components/Button/Button.tsx` — apply `aria-label` (WCAG 2.2 SC 4.1.2)

`ariaLabel` is destructured at line 35 and then **never used** — the `<button>` at
lines 38–44 has only a comment where the attribute should be. Two tests assert on it:

- `Button.test.tsx:18` — `aria-label` must equal the passed `"Add to favourites"`.
- `Button.test.tsx:28` — icon-only with **no** `aria-label` prop must still have a
  non-null `aria-label`. So a pass-through alone is insufficient; an icon-only fallback
  is required.

**Lines 36–44** — before:

```tsx
}: Props) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      // BUG: aria-label is not applied when iconOnly is true and no ariaLabel is passed
      // The component should enforce aria-label for icon-only buttons
    >
```

after:

```tsx
}: Props) {
  const fallbackLabel = typeof children === "string" ? children : "Button"

  if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Button] `iconOnly` buttons require an `aria-label` to provide an accessible name (WCAG 2.2 SC 4.1.2). " +
        `Falling back to "${fallbackLabel}".`,
    )
  }

  const accessibleLabel = ariaLabel ?? (iconOnly ? fallbackLabel : undefined)

  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={accessibleLabel}
    >
```

Design rationale:
- Explicit `aria-label` always wins (satisfies test at line 18).
- Icon-only with no label falls back so the control is never nameless (satisfies line 28).
  A generic `"Button"` is a poor name but strictly better than none — hence the dev warning
  so the omission is caught in development rather than shipped silently. Prefer `children`
  when it is a plain string, as that is a genuinely meaningful name.
- Non-icon-only buttons get `undefined`, so React omits the attribute entirely and the
  visible text remains the accessible name. Avoids clobbering the accessible name of
  normal buttons — `getByText("Click me")` at line 10 still passes.
- The warning is dev-only, so it adds no production noise. It does print once during the
  test run; expected and harmless.

Also update the stale `BUG:` block in the doc comment (lines 20–27).

---

### 5. `packages/ui/src/components/DataTable/DataTable.tsx` — functional state update

Correctness hardening, not a test fix (Correction B). `setSortDir` reads `sortDir` from
the render closure; correct today only because React re-renders between the two clicks.

**Line 34** — before:

```tsx
      setSortDir(sortDir === "asc" ? "desc" : "asc") // BUG: reads stale sortDir
```

after:

```tsx
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
```

Correct under React 18 automatic batching irrespective of how many times the handler
fires per tick. Verified: DataTable stays 3/3.

Also remove the stale `BUG:` comments at lines 18–26 and line 31.

---

### 6. `tsconfig.json` — resolve the `bun:test` TS2307 errors (config-only, no test edits)

**Answer to your question: yes — fully resolvable via a non-test config change.** These
4 errors are a genuine config gap, not a test-file problem, and should be fixed rather
than left alone.

Errors:

```
packages/ui/test/Button.test.tsx(1,51):    TS2307 Cannot find module 'bun:test'
packages/ui/test/DataTable.test.tsx(1,51): TS2307
packages/utils/test/currency.test.ts(1,40): TS2307
packages/utils/test/date.test.ts(1,40):     TS2307
```

Cause: `bun-types` is installed (root devDeps, provides the `bun:test` module
declaration) but nothing tells TypeScript to load it. With no `types` array and no
`/// <reference>`, TS auto-includes `@types/*` packages only — `bun-types` is not under
`@types/`, so it is skipped. Confirmed: `bunx tsc --noEmit --types bun-types` drops all
four errors, leaving only the real `api.ts` TS2305.

**In `compilerOptions`, after `"skipLibCheck": true,`** add:

```json
    "types": ["bun-types"],
```

Verified: `tsc --noEmit` exits 0 with all edits applied. `"types": ["bun-types"]` alone is
sufficient — `react`/`@types/react` continue to resolve through normal module resolution
from the `import React from "react"` statements, so it does not need listing.

Caveat: adding `types` switches off auto-inclusion of ambient `@types/*` packages. This
repo's only relevant ambient package is `@types/react` (consumed via imports, not
ambiently), so there is no fallout here — confirmed by the clean typecheck. If ambient
globals are added later, extend the array.

No dependency is added; `bun-types: latest` is already declared at `package.json:16`.

---

## Summary

| # | File | Change | Effect |
|---|---|---|---|
| 1 | `apps/web/src/lib/api.ts` | `useThrottle` → `useDebounce` (lines 11, 32) | +2 tests, −1 tsc error |
| 2 | `packages/utils/src/format/date.ts` | `formatToParts` + unpad day (lines 12–19) | +1 test |
| 3 | `bunfig.toml` | add root-relative `preload` | +6 tests (4 pass, 2 → edit 4) |
| 4 | `packages/ui/.../Button.tsx` | apply `aria-label` + icon-only fallback + dev warn | +2 tests |
| 5 | `packages/ui/.../DataTable.tsx` | `setSortDir(prev => ...)` | 0 (latent bug) |
| 6 | `tsconfig.json` | `"types": ["bun-types"]` | −4 tsc errors |

Expected: `bun test` → **13 pass / 0 fail**; `bunx tsc --noEmit` → **exit 0**.

Suggested order: 3 → 1 → 2 → 4 → 5 → 6 (DOM first, so UI assertions are observable).

## Compliance note

Edit 4 is the only change with a compliance dimension: it closes a **WCAG 2.2 AA
SC 4.1.2 (Name, Role, Value)** defect — an icon-only control with no accessible name is
unusable with a screen reader. The dev-time warning also serves as a guardrail against
reintroducing nameless controls. No authentication, cryptography, network boundary, data
handling, or personal-data path is touched by any edit, so no ISM/ES8/APP controls are in
scope. No new dependencies, so no supply-chain (ES8 application control) impact. Nothing
here affects data residency.
