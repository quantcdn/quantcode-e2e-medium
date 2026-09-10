// Ambient type reference for Bun's built-in modules (notably `bun:test`).
//
// `bun-types` is a declared devDependency but is not published under
// `node_modules/@types`, so TypeScript does not pick it up automatically and
// every `import ... from "bun:test"` fails to resolve with TS2307.
//
// This lives in the test tree rather than under `src/` so the Bun globals it
// pulls in are scoped to test compilation, and any build that compiles only
// `src/` does not inherit them. The conventional home would be
// `"types": ["bun-types"]` in tsconfig.json; it is declared here instead to
// keep the build configuration untouched.
/// <reference types="bun-types" />
