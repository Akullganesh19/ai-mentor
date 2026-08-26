## YYYY-MM-DD — Sentinel: SSRF Vulnerability Closed
**Vulnerability class:** Server-Side Request Forgery (SSRF)
**Entry point:** `src/app/api/try-it/route.ts` - The `POST` route takes a user-supplied `url` and fetches it server-side.
**Fix:** Added URL parsing and hostname validation to block internal IP addresses (e.g., localhost, 127.0.0.1, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, fd00::/8, etc.) and `localhost` from being fetched by the server.
**Blast radius before fix:** An attacker could use this endpoint to make requests to internal services, AWS metadata endpoints (169.254.169.254), or local services running on the same server, potentially exposing internal data or bypassing firewalls.
**Next opportunity:** Review file upload functionality or content processing for path traversal or XSS vulnerabilities.