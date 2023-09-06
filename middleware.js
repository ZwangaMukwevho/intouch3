import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("id");
  let url = req.url;

  console.log("verify");
  console.log(url);
  const currentTime = new Date();
  console.log(currentTime);
  console.log("");
  if (!verify && url.includes("/certify")) {
    return NextResponse.redirect("http://localhost:3000/signin");
  }
}
