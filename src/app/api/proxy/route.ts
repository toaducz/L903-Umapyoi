// app/api/proxy/route.ts
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const endpoint = searchParams.get('endpoint')

  if (!endpoint) {
    return new Response(JSON.stringify({ error: 'Missing endpoint' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const params = new URLSearchParams(searchParams)
  params.delete('endpoint') // tránh lặp

  const url = `https://umapyoi.net${endpoint}${params.toString() ? `?${params.toString()}` : ''}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'L903-UmaClient',
      Accept: 'application/json'
    }
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  })
}
