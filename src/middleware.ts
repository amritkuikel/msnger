import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");
  let url = req.url;
  // if (verify && url.includes("/login")) {
  //   return NextResponse.redirect("https://attendies-eight.vercel.app/dashboard");
  // }
  // if (!verify && url.includes("/dashboard" )) {
  //   return NextResponse.redirect("https://attendies-eight.vercel.app/login");
  // }
  // if (verify && url.includes("/register")) {
  //   return NextResponse.redirect("https://attendies-eight.vercel.app/dashboard");
  // }
  if (verify && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/dashboard");
  }
  if (!verify && url.includes("/dashboard" )) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  if (verify && url.includes("/register")) {
    return NextResponse.redirect("http://localhost:3000/dashboard");
  }
}
