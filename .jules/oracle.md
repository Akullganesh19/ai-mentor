## 2024-10-21 — Add observability to swallowed background errors
**Blind spot found:** Critical background tasks (search telemetry, analytics beacon, middleware events) and integrations (MCP tool errors, Thally Cloud AI requests) were catching errors and silently swallowing them without producing actionable logs.
**Instrumentation added:** Structured `console.error` and `console.warn` statements within the catch blocks in `src/app/api/mcp/route.ts`, `src/lib/cloud-link/services.ts`, `src/middleware.ts`, `src/app/api/search/route.ts`, and `src/app/api/search/track/route.ts`.
**Incident value:** If AI chat degrades, or if storage starts rejecting rate limit operations, or if analytics silently drops metrics, these events will now appear in standard server logs enabling swift resolution. The application still degrades gracefully for the user.
**Next opportunity:** Analyze API endpoints that might not be logging context about rate-limit triggers.
