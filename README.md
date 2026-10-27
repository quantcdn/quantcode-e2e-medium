# quantcode-e2e-medium

**Tier 3 corpus** for the QuantCode autonomous agent e2e harness.

A medium-sized TypeScript monorepo with a React component library, shared utilities, and a Next.js-style web app. Contains intentional bugs spanning multiple packages.

## Structure

```
packages/
  ui/       React component library (Button, DataTable)
  utils/    Shared hooks and formatting utilities
apps/
  web/      Web application consuming both packages
```

## Running tests

```bash
bun test --recursive
```

## Known issues (intentional — for agent testing)

All four seeded bugs have been fixed:

1. ~~**`packages/utils/src/format/date.ts`** — `formatDate` produces US-style dates instead of AU-style~~ — **fixed**: formats via `en-AU` `formatToParts` so output is day-first with an unpadded day (e.g. `1/03/2024`)
2. ~~**`packages/ui/src/components/Button/Button.tsx`** — icon-only button missing `aria-label` attribute (WCAG 4.1.2)~~ — **fixed**: `iconOnly` buttons always render an `aria-label`, falling back to string `children` then a generic label, with a development warning [WCAG-4.1.2]
3. ~~**`packages/ui/src/components/DataTable/DataTable.tsx`** — stale closure in sort handler~~ — **not a defect**: each click commits its own render, so `sortDir` is current when the next handler runs. The file is unchanged and its tests pass as written
4. ~~**`apps/web/src/lib/api.ts`** — imports `useThrottle` which was renamed to `useDebounce`~~ — **fixed**: imports `useDebounce` (merged into the single `@e2e/utils` import) and re-exports it as `useSearchDebounce`
