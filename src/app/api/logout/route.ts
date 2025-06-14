import { NextResponse } from "next/server";

// app/api/logout/route.ts
export async function GET() {
  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
  );
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });
  return response;
}
