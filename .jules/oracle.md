## 2024-05-24 — [Admin Auth, Settings, and MCP]
**Blind spot found:** Critical admin state changes (authentication and settings updates) and silent MCP tool/storage errors were leaving no audit trail or diagnostic telemetry.
**Telemetry added:** Structured JSON logs (using `console.info`, `console.warn`, `console.error`) for successful/failed admin logins (password and OIDC), successful admin settings updates (recording modified keys), and silent MCP failures (rate-limiting KV storage hiccups and tool execution errors). PII (passwords, full emails) is carefully excluded.
**Debugging value:** Enables rapid diagnosis of unauthorized access attempts, tracks admin configuration drift, and illuminates silent framework failures during agent tool execution, allowing for proactive issue detection before users report them.
**Next opportunity:** Instrument observability for critical user-facing state changes (e.g., feedback submissions and API key provisioning).
