// middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import withAuth from "./src/middleware/withAuth";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  return withAuth(
    (req) => {
      return NextResponse.next();
    },
    // Tambah route /editor agar ikut diproteksi (Tugas Mandiri No. 2)
    ["/profile", "/admin", "/editor"]
  )(req, event);
}

export const config = {
  matcher: ["/profile", "/admin", "/editor"],
};
