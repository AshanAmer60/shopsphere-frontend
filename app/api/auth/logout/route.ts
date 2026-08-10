import { NextResponse } from "next/server";

const clearAuthCookies = (res: NextResponse) => {
  res.cookies.set("accessToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
};

export async function POST(request: Request) {
  const backend = process.env.BACKEND_URL ?? "http://localhost:4000";

  try {
    await fetch(`${backend}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });
  } catch {
    // Still clear cookies on this origin even if the backend is unreachable
  }

  const res = NextResponse.json({ message: "Logged out successfully" });
  clearAuthCookies(res);
  return res;
}
