# Fix plan — make `bun test` pass and `bunx tsc --noEmit` clean

Repo: `/workspace/repo` (branch `quantcode/e2e-tier3-2172-1788970779`), bun 1.4.2, TZ=UTC.

**Constraints honoured:** no test files changed, no dependencies added, minimal edits only.

**Verification method:** every fix below was applied to a throwaway copy at `/tmp/verify` and
run end-to-end. The real repo was left untouched (`git status` clean). Final state of the copy:

| Command | Before | After |
|---|---|---|
| `bun test packages/utils/test packages/ui/test apps/web/test` | 4 pass / 9 fail | **13 pass / 0 fail** |
| `bun run test` (script, has `--preload`) | 8 pass / 5 fail | **13 pass / 0 fail** |
| `bunx tsc --noEmit` | exit 2, 5 errors | **exit 0** |
| `cd packages/ui && bun test` | 4 pass / 2 fail | **6 pass / 0 fail** |

---

## Corrections to the brief — read before implementing

Three of the five stated diagnoses do not match the actual behaviour. Implementing them as
described would waste effort or introduce a needless change.

### Item 2 is NOT an override problem — `[test].environment` is not a real bun option

The brief asks to "confirm the root sets `environment = "happy-dom"` and packages/ui overrides it".
That is not what happens. **Bun 1.4.2 has no `[test].environment` key at all** — it is silently
ignored, not overridden. Proven with a minimal repro outside the repo:

```
/tmp/bftest/bunfig.toml  ->  [test]\nenvironment = "happy-dom"
/tmp/bftest/a.test.ts    ->  expect(typeof document).toBe("object")
$ bun test   =>  0 pass / 1 fail   ("document is not defined")
```

So the root `bunfig.toml` line has **never** provided a DOM. `packages/ui/bunfig.toml` is
correct and is the only thing that works (via `preload` → `GlobalRegistrator.register()`), which
is why `cd packages/ui && bun test` gets a DOM but a root-level run does not. Bun reads the
bunfig next to the CWD, not one per test file — so a root run never sees `packages/ui/bunfig.toml`.
The fix is to give the **root** a `preload`, not to re-declare an environment that does nothing.

### Item 4 — the DataTable stale closure does NOT fail; no fix required

`sorts descending on second click (stale closure test)` **already passes**, 3/3 tests green,
confirmed stable over 5 consecutive runs. The failures you saw for `DataTable.test.tsx` were
100% the missing-DOM error from item 2, not the sort logic.

Why the "bug" is latent rather than active: `fireEvent.click` wraps each click in its own
`act()`, so React flushes the state update and re-renders between the two clicks. `handleSort`
is therefore re-created with a fresh `sortDir` before the second click reads it. The closure is
only stale for two clicks dispatched inside a *single* batch, which no test does.

`setSortDir(prev => prev === "asc" ? "desc" : "asc")` at `DataTable.tsx:34` is still the
correct-by-construction form and I'd take it in review, but it is **out of scope** under
"fix only what tests require". Flagging as Info, not actioning.

### Item 5 — the root cause is zero-padding, not field ordering

`date.ts:1-11` claims explicit field order "overrides locale ordering — produces M/D/YYYY".
That comment is wrong. Measured on this runtime:

```
en-AU {month:"numeric", day:"numeric", year:"numeric"}  ->  15/06/2024  |  01/03/2024   (current)
en-AU {day:"numeric", month:"numeric", year:"numeric"}  ->  15/06/2024  |  01/03/2024   (identical!)
```

`Intl` ignores the order you list the option keys in — `en-AU` is already day-first, so
test 1 (`/^15/`) passes today. Reordering the keys changes **nothing** and does not fix test 2.

The real problem: ICU's `en-AU` short-date pattern is `dd/MM/y`, so `day:"numeric"` is coerced
to 2-digit `01`, failing `/^1/`. The suggested `dateStyle:"short"` *would* pass both assertions
(`1/3/24`) but silently truncates the year to 2 digits — a regression for a date formatter, and
it also contradicts `formatDateTime`, which keeps a 4-digit-year style. Hence the
`formatToParts` fix below, which strips the day's leading zero and keeps `DD/MM/YYYY` intact.

---

## The 5 fixes

### 1. `apps/web/src/lib/api.ts` — broken import + re-export (2 lines)

Fixes `api module > imports without error` and `useSearchDebounce is exported`, plus TS2305.
The hook's real current name is **`useDebounce`** (`packages/utils/src/hooks/useDebounce.ts:10`,
exported at `packages/utils/src/index.ts:1`). `useThrottle` no longer exists anywhere.

- **Line 11:** `import { useThrottle } from "@e2e/utils"` → `import { useDebounce } from "@e2e/utils"`
- **Line 32:** `export { useThrottle as useSearchDebounce }` → `export { useDebounce as useSearchDebounce }`

Keep the `useSearchDebounce` public alias — `api.test.ts:13` asserts that exact name.

### 2. `bunfig.toml` (root) — replace the no-op `environment` with a `preload`

Fixes all 6 `ReferenceError: document is not defined` failures. bunfig is config, not a test file.

```toml
[test]
preload = ["./packages/ui/test/setup.ts"]
```

`packages/ui/test/setup.ts` is already correct (registers happy-dom globals) — no change needed
there. Leave `packages/ui/bunfig.toml` as-is so `cd packages/ui && bun test` keeps working
(verified: 6 pass). This also makes the bare `bun test` invocation work without relying on the
`--preload` flag that `package.json`'s script passes.

### 3. `packages/ui/src/components/Button/Button.tsx` — apply `aria-label` to the element

Two tests need this. `Button.test.tsx:18` requires the passed label to reach the DOM;
`Button.test.tsx:28` requires a non-null `aria-label` even when **none is passed**. The prop is
destructured as `ariaLabel` (line 35) but never rendered — the `<button>` (lines 38-44) has no
`aria-label` attribute at all. Satisfying test 3 means a fallback is mandatory, not just
forwarding.

In the component body, before `return`:

```tsx
const resolvedAriaLabel =
  ariaLabel ?? (iconOnly ? (typeof children === "string" ? children : "Button") : undefined)

if (process.env.NODE_ENV !== "production" && iconOnly && !ariaLabel) {
  console.warn(
    "[Button] iconOnly requires an explicit `aria-label` for an accessible name (WCAG 2.2 SC 4.1.2)."
  )
}
```

Then replace the two BUG comment lines inside the `<button>` tag with:

```tsx
aria-label={resolvedAriaLabel}
```

Notes: the `undefined` branch means non-icon buttons emit **no** `aria-label`, so the visible
text stays the accessible name — this avoids breaking WCAG 2.5.3 (Label in Name) and keeps
`renders with text` passing. The dev-only `console.warn` is the "warn" the test name gestures at
and pushes authors toward a *meaningful* label, since the `"Button"` fallback is a compliance
floor, not a good name.

### 4. `packages/ui/src/components/DataTable/DataTable.tsx` — no change

Already passing. See "Corrections" above. Do not edit as part of this task.

### 5. `packages/utils/src/format/date.ts` — un-pad the day via `formatToParts`

Fixes `day 1 is not confused with month 1`. Replace the body of `formatDate` (lines 12-19):

```ts
export function formatDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date)

  return parts.map((p) => (p.type === "day" ? String(Number(p.value)) : p.value)).join("")
}
```

Measured output: `15/06/2024` and `1/03/2024` — satisfies `/^15/`, `/^1/`, and `contains "3"`,
while preserving the 4-digit year and locale-driven day-first order. Leave `formatDateTime`
(lines 21-26) alone; no test touches it. The stale BUG comment at lines 1-11 should be deleted
or corrected so it doesn't mislead the next reader.

---

## Bonus: 4 further `tsc` errors not in your list

"`bunx tsc --noEmit` clean" needs one more edit. Beyond TS2305 (fixed by item 1), all four test
files error with `TS2307: Cannot find module 'bun:test'` — `bun-types` is installed
(`package.json:16`) but never wired into `tsconfig.json`, and `tsconfig.json:14` includes
`packages/*/test/**/*` in the program.

In `tsconfig.json`, add to `compilerOptions` (after `skipLibCheck`, line 8):

```json
"types": ["bun-types", "react"],
```

This is a config change, not a test-file change. Verified: `tsc --noEmit` → exit 0.

---

## Suggested commit split

1. `fix(web): correct renamed useDebounce import in api client`
2. `fix(ui): preload happy-dom at workspace root for DOM tests`
3. `fix(ui): apply aria-label to button element [WCAG-4.1.2]`
4. `fix(utils): stop zero-padding day in en-AU formatDate`
5. `chore(ts): register bun-types so bun:test resolves`

## Compliance note

Fix 3 is the only security/compliance-relevant change: it closes a **WCAG 2.2 SC 4.1.2
(Name, Role, Value)** gap where icon-only buttons had no accessible name — mandatory under the
Digital Service Standard v2.0 for AU Government services. No auth, crypto, network boundary,
data-handling or dependency surface is touched, so no ISM control mapping or ES8 maturity
assessment applies. No new dependencies, so no supply-chain review needed.
