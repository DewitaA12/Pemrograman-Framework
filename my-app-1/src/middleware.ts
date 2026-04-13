import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import withAuth from './middleware/withAuth'

export function middleware(req: NextRequest, event: NextFetchEvent) {
  return withAuth(
    (req) => {
      return NextResponse.next();
    },
    ["/profile"]
  )(req, event);
}

export const config = {
  matcher: ["/profile"],
};