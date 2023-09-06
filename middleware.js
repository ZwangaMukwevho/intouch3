import { NextResponse } from "next/server";

export default function middleware(req, res) {
  let verifyCookie = req.cookies.get("id");
  let url = req.url;

  if (url.includes("/certify")) {
    // Check if the "verify" cookie does not exist or does not have the expected value
    if (
      !verifyCookie ||
      (typeof verifyCookie === "object" && verifyCookie.name !== "id")
    ) {
      // Redirect to the "signin" page
      return NextResponse.redirect("http://localhost:3000/signin");
    }
  }
}
