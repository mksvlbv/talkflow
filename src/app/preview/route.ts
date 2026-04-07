import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("preview_mode", "true", {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "lax",
  });
  return response;
}
