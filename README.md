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

1. **`packages/utils/src/format/date.ts`** — `formatDate` produces US-style dates instead of AU-style
2. **`packages/ui/src/components/Button/Button.tsx`** — icon-only button missing `aria-label` attribute (WCAG 4.1.2)
3. **`packages/ui/src/components/DataTable/DataTable.tsx`** — stale closure in sort handler
4. **`apps/web/src/lib/api.ts`** — imports `useThrottle` which was renamed to `useDebounce`
