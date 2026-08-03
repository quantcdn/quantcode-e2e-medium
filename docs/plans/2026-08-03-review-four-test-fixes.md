# Review — uncommitted four-test-fix change (Bun/TS monorepo)

Branch: `quantcode/e2e-tier3-2158-1785776048` · Base: `7e2198e` · Reviewed: 2026-08-03

## Remediation status (2026-08-03, code agent)

`bun run test` 13/13 pass · `bun run typecheck` exit 0.

| Finding | Status |
|---|---|
| 1 — date padding | **Fixed.** `formatDate` now `D/M/YYYY` (`1/3/2024`, `15/6/2024`) |
| 2 — Button `"Button"` fallback | **Blocked by test.** Docstring records the defect |
| 3 — DataTable docstring | **Fixed.** Rewritten as a consolidation, not a bug fix |
| Nit — stale `useDebounce` rename note | **Fixed.** Removed |

Correction to the handoff instruction on finding 1: `{day:"numeric", month:"numeric",
year:"numeric"}` does **not** yield `1/3/2024`. `en-AU` resolves both fields to
`2-digit` regardless of what is requested (verified via `resolvedOptions()`), giving
`01/03/2024` — which fails `date.test.ts:17` (`/^1/`). Consistent unpadding requires
`formatToParts` on **both** `day` and `month`. Implemented that way; output now aligns
with `formatDateTime`'s existing `dateStyle: "short"` (`1/3/24`).

**Finding 2 could not be actioned without editing a test.** `Button.test.tsx:28`
asserts `getAttribute("aria-label")).not.toBeNull()` for an icon-only button with no
label and no children. Omitting the attribute — the correct accessible behaviour — makes
that assertion fail (confirmed: 12 pass / 1 fail). The test therefore *mandates* the
placeholder. Reverted to keep the suite green; the `"Button"` fallback and its
`SC 2.4.6` breach are now documented as a KNOWN ISSUE in `Button.tsx:24-31`, and the
dev warning names the trade-off explicitly. **Needs a test-owner decision** — see
follow-up 2 below.

Verdict: **COMMENT** — approve with two fixes recommended. No Blockers.
Verified: `bun test` 13/13 pass, `tsc --noEmit` clean (exit 0).

## Baseline established by revert (important)

Reverting all five files and re-running gives **5 failures, not 4**:

| Failing test (baseline) | Fixed by |
|---|---|
| `api module > imports without error` | api.ts import rename |
| `api module > useSearchDebounce is exported` | api.ts re-export rename |
| `Button > icon-only ... via aria-label` | Button aria-label applied |
| `Button > icon-only without aria-label still renders` | Button fallback label |
| `formatDate > day 1 is not confused with month 1` | date.ts change |

**`DataTable` tests pass at baseline (3/3).** The DataTable refactor fixed no failing
test — it was not one of the four failures. See finding 2.

## Findings

### 1. Warning — `formatDate` produces inconsistent day padding (`D/MM/YYYY`)
`packages/utils/src/format/date.ts:8-17`. The `formatToParts` day-unpadding makes
output asymmetric: day unpadded, month zero-padded.

Measured old vs new:

| Date | old | new |
|---|---|---|
| 15 Jun 2024 | `15/06/2024` | `15/06/2024` |
| 1 Mar 2024 | `01/03/2024` | `1/03/2024` |
| 1 Jan 1970 | `01/01/1970` | `1/01/1970` |

`1/03/2024` is not a standard AU format; AS/Govt style is `01/03/2024` or `1/3/2024`.
The docstring claim "Australian dates are day-first (D/MM/YYYY)" is the artefact being
described, not a real convention. Padding regressed for all single-digit-day dates —
untested behaviour, and the kind of thing that shows up in exported CSVs/PDFs.

Also note the diff's stated premise is false: the **original already produced
day-first** output (`15/06/2024`, `01/03/2024`), because `en-AU` controls field order
regardless of option declaration order. The real baseline failure was only the
`expect(result).toMatch(/^1/)` assertion — `01/03/2024` starts with `0`. So the fix
targets the assertion's shape, not a genuine MM/DD ordering bug.

Recommend `{ day: "2-digit", month: "2-digit", year: "numeric" }` via plain `.format()`
— gives `01/03/2024`, drops the `formatToParts` map, and still satisfies both tests
(`/^15/` matches; day-1 test needs `/^1/`… **verify**: `01/03/2024` fails `/^1/`).
Since tests must not change, the padded form is not reachable without a test edit —
so either keep current behaviour and accept `1/03/2024`, or use
`{day:"numeric", month:"numeric", year:"numeric"}` → `1/3/2024`, which is
internally consistent and a legitimate AU short form. **Prefer the latter.**

### 2. Warning — DataTable refactor is a no-op behaviourally; docstring is misleading
`packages/ui/src/components/DataTable/DataTable.tsx:16-34`. Differential-tested old vs
new across 8 click sequences (`[]`, `Name`, `Name×2`, `Name×3`, `Name>Age`,
`Name×2>Age`, `Age×2>Name×2`, `Age>Name>Age`), comparing row order **and** `aria-sort`:
**identical in all 8**. Baseline DataTable tests: 3/3 pass.

There was no stale-closure bug. `handleSort` is recreated every render, so `sortDir` is
current at click time; React's batching concern in the new docstring does not apply to
discrete click events in separate tasks. The refactor is harmless and arguably tidier
(single atomic state object), but the docstring asserts it fixed a bug that did not
exist. Either drop the refactor or correct the comment to say it is a consolidation.

No regression risk found: `DataTable` has no external consumers beyond
`packages/ui/src/index.ts:2`.

### 3. Warning — `aria-label="Button"` fallback defeats the WCAG check it claims to satisfy
`packages/ui/src/components/Button/Button.tsx:35-40`. Measured markup:

| Input | Rendered |
|---|---|
| `iconOnly` + `aria-label="Add to favourites"` | `aria-label="Add to favourites"` ✅ |
| `iconOnly`, no label | `aria-label="Button"` ⚠️ |
| `iconOnly` + `<span>Delete item</span>` children | `aria-label="Button"` ⚠️ (real label lost) |
| `iconOnly` + `"Save draft"` string children | `aria-label="Save draft"` ✅ |
| normal button | no `aria-label` ✅ (correct — visible text is the name) |

Answering the question asked: a generic `"Button"` fallback **technically satisfies**
SC 4.1.2 (a non-empty accessible name exists) but **fails SC 2.4.6 Headings and Labels**
and defeats the purpose — a screen-reader user hears "Button, button", which is no more
useful than no name, while automated scanners (axe, Lighthouse) now report a *pass*.
That is worse than failing loudly: it converts a detectable defect into a silent one.

The dev `console.warn` mitigates this in development only, and is emitted on every
render (noisy in dev; React StrictMode double-invokes). It is stripped in production
by the `NODE_ENV` guard, so a mislabelled button ships silently.

Recommend: keep the warn, but drop the `"Button"` string fallback — omit `aria-label`
entirely when there is no real label, so scanners and the existing test both see the
truth. Note the test only asserts `not.toBeNull()`, so it will fail without *some*
value; the cleanest option satisfying it without a test edit is to derive from
`children` and otherwise leave it to the caller — worth a follow-up discussion with
the test owner, since "make the a11y scanner pass" is the wrong incentive here.
Case 4 (node children silently → `"Button"`) is the concrete data-loss path.

### 4. Good — `api.ts` import rename is the correct, complete fix
`apps/web/src/lib/api.ts:5,26`. `useDebounce` is the real exported name
(`packages/utils/src/index.ts:1`), the alias `useSearchDebounce` is preserved so no
caller breaks, and the stale BUG comments were removed. Semantics match: the hook is a
genuine debounce (trailing-edge `setTimeout` + `clearTimeout` cleanup), so the
`useSearchDebounce` name is accurate — not merely a rename that papers over a
throttle/debounce mismatch. `formatAUD`/`formatDate` re-exports unchanged. Correct.

### 5. Good — `tsconfig.json` `types: ["bun-types"]` is necessary and minimal
`tsconfig.json:9`. Verified: without it, `tsc --noEmit` emits 4× `TS2307 Cannot find
module 'bun:test'`. `bun-types` is already a declared devDependency and is installed.
Legitimately required, not a suppression.

## Nits (non-blocking)

- `packages/utils/src/format/date.ts:1-7` — docstring states `D/MM/YYYY` as the AU
  convention; reword once padding is settled.
- `packages/utils/src/hooks/useDebounce.ts:5-6` — stale "recently renamed / will break"
  note now that the only consumer is fixed; safe to drop.
- `Button.tsx:35` — warning fires on every render; a `useEffect`/dev-only memo would
  reduce dev-console noise.
- `formatDate` throws `RangeError` on an invalid `Date` (both before and after) —
  pre-existing, unchanged, but undocumented.

## Suggested follow-up for the `code` agent

1. ~~`date.ts` — settle on consistent padding.~~ **Done** — `D/M/YYYY`.
2. `Button.tsx` — **open, needs test-owner decision.** Remove the generic `"Button"`
   fallback so the missing name stays detectable. Requires changing
   `Button.test.tsx:28` from `not.toBeNull()` to an assertion of the intended
   contract, e.g. either
   `expect(btn.getAttribute("aria-label")).toBeNull()` (attribute omitted; defect
   visible to axe/Lighthouse — recommended), or keep a name but require it to be
   meaningful and derived from `children`, including non-string children. Also
   consider making the prop type enforce this at compile time via a discriminated
   union — `{ iconOnly: true; "aria-label": string } | { iconOnly?: false }` — so the
   omission is a type error rather than a runtime warning.
3. ~~`DataTable.tsx` — correct the docstring.~~ **Done.**
4. Optional: `Button.tsx` warning fires on every render (React StrictMode
   double-invokes). Move to a `useEffect` if dev-console noise becomes a problem.

Tests were not modified. Item 2 is the only outstanding item and is blocked on the
assertion at `Button.test.tsx:28`.
