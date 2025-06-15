import { NextResponse } from "next/server";

// app/api/logout/route.ts
export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
