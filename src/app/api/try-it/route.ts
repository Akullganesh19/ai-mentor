import { NextResponse, type NextRequest } from 'next/server'

const BLOCKED_HEADERS = new Set(['host', 'connection', 'content-length'])

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as {
    method?: string
    url?: string
    headers?: Record<string, string>
    body?: string
  }

  if (!payload?.url || !payload?.method) {
    return NextResponse.json({ error: 'Missing url or method' }, { status: 400 })
  }

  if (!/^https?:\/\//i.test(payload.url)) {
    return NextResponse.json({ error: 'Only HTTP(S) requests are allowed' }, { status: 400 })
  }

  const method = payload.method.toUpperCase()
  const headers = Object.entries(payload.headers ?? {}).reduce<Record<string, string>>((acc, [key, value]) => {
    if (!value || BLOCKED_HEADERS.has(key.toLowerCase())) {
      return acc
    }
    acc[key] = value
    return acc
  }, {})

  const controller = new AbortController()
  const startedAt = Date.now()

  try {
    const response = await fetch(payload.url, {
      method,
      headers,
      body: shouldIncludeBody(method) ? payload.body ?? undefined : undefined,
      signal: controller.signal,
    })

    const textBody = await response.text()
    const duration = Date.now() - startedAt

    if (duration > 5000) {
      try {
        const safeUrl = new URL(payload.url)
        safeUrl.search = '' // Strip query parameters to avoid leaking secrets
        console.warn(JSON.stringify({
          msg: 'try-it: High latency request',
          method,
          url: safeUrl.toString(),
          duration_ms: duration,
          status: response.status,
        }))
      } catch {
        // Ignore URL parse errors for logging
      }
    }

    return NextResponse.json(
      {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: textBody,
        duration,
      },
      { status: 200 },
    )
  } catch (error) {
    try {
      const safeUrl = payload?.url ? new URL(payload.url) : null
      if (safeUrl) safeUrl.search = '' // Strip query parameters
      console.error(JSON.stringify({
        msg: 'try-it: Proxy request failed',
        method: payload?.method,
        url: safeUrl?.toString() ?? payload?.url,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      }))
    } catch {
      console.error(JSON.stringify({
        msg: 'try-it: Proxy request failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
    }

    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function shouldIncludeBody(method: string) {
  return !['GET', 'HEAD'].includes(method.toUpperCase())
}

