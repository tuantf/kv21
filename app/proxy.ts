import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Trusted origins (for browser CORS requests)
const ALLOWED_ORIGINS = [
  'https://kv21.io.vn',
  'https://www.kv21.io.vn',
  'http://localhost:3000',
  'http://10.199.1.16:3000',
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()

  // Skip CORS origin checking for API routes - they use bearer token auth
  // Server-to-server requests (like cron-job.org) don't have origin headers
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')

  if (isApiRoute) {
    // For API routes, only set CORS headers if there's an origin (browser request)
    // Server-to-server requests without origin should pass through without CORS restrictions
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    // Don't set CORS headers for server-to-server requests (no origin header)
    // This allows cron-job.org and other services to call the API
  } else {
    // For non-API routes, apply CORS validation as before
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    } else if (origin) {
      // Only set 'null' if there's an origin header but it's not allowed
      response.headers.set('Access-Control-Allow-Origin', 'null')
    }
  }

  // Set CORS headers only if we're handling a CORS request (has origin)
  if (origin) {
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With',
    )
    response.headers.set('Access-Control-Max-Age', '86400')
  }

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
