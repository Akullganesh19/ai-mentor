## 2025-06-25 — Try-It Proxy Telemetry
**Blind spot illuminated:** Unmonitored failures and high latency in the `/api/try-it` API proxy endpoint. Failed fetches swallowed their stack traces, returning a generic 500 error to the client with no server-side forensic trail.
**Telemetry added:** Structured JSON logging in `src/app/api/try-it/route.ts` using `console.warn` for requests taking longer than 5 seconds, and `console.error` for unhandled fetch failures. URLs are safely parsed and query parameters are stripped to prevent leaking API keys or secrets in logs.
**Diagnostic value:** When the API playground stops working for a user (e.g. DNS failure, blocked egress, or timeouts), engineers can now see the exact URL origin and the underlying network error/stack trace without needing to reproduce it blindly.
**Next opportunity:** Investigate observability for the search analytics background job (`/api/search/track`).
