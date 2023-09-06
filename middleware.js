import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("id");
  let url = req.url;

  if (!verify && url.includes("/home")) {
    return NextResponse.redirect("http://localhost:3000/signin");
  }
}
