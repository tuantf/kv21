import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Trusted origins
const ALLOWED_ORIGINS = [
  'https://kv21.io.vn',
  'https://www.kv21.io.vn',
  'http://localhost:3000',
  'http://10.199.1.16:3000'
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()

  // Validate origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    // Required for cookies
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  } else {
    response.headers.set('Access-Control-Allow-Origin', 'null')
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  response.headers.set('Access-Control-Max-Age', '86400')

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: response.headers })
  }

  return response
}