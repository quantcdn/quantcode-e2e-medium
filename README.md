# quantcode-e2e-medium

**Tier 3 corpus** for the QuantCode autonomous agent e2e harness.

A medium-sized TypeScript monorepo with a React component library, shared utilities, and a Next.js-style web app.

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
bun test          # all packages, from the repo root
npx tsc --noEmit  # typecheck
```

The root `bunfig.toml` preloads `packages/ui/test/setup.ts`, which registers
happy-dom globals so React component tests have a `document`.

## Corpus history

This corpus originally shipped with four intentional cross-package bugs, all of
which have been fixed:

1. **`packages/utils/src/format/date.ts`** — `formatDate` produced US-style dates instead of AU-style
2. **`packages/ui/src/components/Button/Button.tsx`** — icon-only button missing `aria-label` (WCAG 4.1.2)
3. **`packages/ui/src/components/DataTable/DataTable.tsx`** — stale closure in the sort handler
4. **`apps/web/src/lib/api.ts`** — imported `useThrottle`, which was renamed to `useDebounce`

To restore the original buggy state, check out the initial commit.
