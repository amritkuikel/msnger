import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");
  let url = req.url;
  if (verify && url.includes("/login")) {
    return NextResponse.redirect("https://attendies-eight.vercel.app");
  }
  if (!verify && url === "https://attendies-eight.vercel.app") {
    return NextResponse.redirect("https://attendies-eight.vercel.app/login");
  }
  if (verify && url.includes("/register")) {
    return NextResponse.redirect("https://attendies-eight.vercel.app");
  }
}
