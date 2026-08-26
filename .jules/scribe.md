## 2026-08-26 — Scribe: Documented Next.js App Router Behavior
**Gap found:** The `src/content/changelog.mdx` file tells authors to "Replace this entry with changes your readers need to understand", but it lacks instructions on how authors should actually structure new changelog entries (e.g., as new `.mdx` files or by appending to this single file).
**Fix:** Added a descriptive comment block to `src/content/changelog.mdx` clarifying that new entries should be added to the top of the file using standard `## vX.Y.Z` headings.
**Who this unblocks:** New documentation contributors who need to publish changelogs without wondering how the site architecture handles them.
**Next opportunity:** Expand the README to detail the `THALLY_AUTH_SECRET` environment variable requirement.