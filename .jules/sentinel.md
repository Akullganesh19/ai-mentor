## 2025-02-23 — Reverted runtime fix inside starter template
**Vulnerability class:** N/A (Process Violation)
**Entry point:** `src/app/api/admin/auth/callback/route.ts` and `src/lib/auth/__tests__/auth.test.ts`
**Fix:** The CI failed because I applied a fix to files owned by the runtime (`src/app/**` and `src/lib/**`), which are generated snapshots from `thallylabs/thally`. Modifying them directly in `thallylabs/starter` causes the `starter-runtime-contract.mjs check` in CI to fail. I have reverted my changes.
**Blast radius before fix:** Broken CI synchronization.
**Next opportunity:** Wait for the fix to be authored in `thallylabs/thally` and automatically synchronized into this repository.
