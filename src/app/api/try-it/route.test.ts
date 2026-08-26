import { POST } from './route'
import { NextRequest } from 'next/server'
import { describe, it, expect } from 'vitest'

describe('Try It Route', () => {
  it('should block SSRF attempts to localhost', async () => {
    const req = new NextRequest('http://localhost/api/try-it', {
      method: 'POST',
      body: JSON.stringify({ url: 'http://localhost:3000', method: 'GET' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Requests to internal addresses are not allowed')
  })

  it('should block SSRF attempts to private IPv4', async () => {
    const req = new NextRequest('http://localhost/api/try-it', {
      method: 'POST',
      body: JSON.stringify({ url: 'http://169.254.169.254/latest/meta-data', method: 'GET' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBe('Requests to internal addresses are not allowed')
  })
})
