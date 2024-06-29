import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  // return NextResponse.redirect("/home");
  const url = req.nextUrl.clone();
  url.pathname = "/home";
  console.log("URL_HOME", url.toString());
  return NextResponse.redirect(url);
};

export const runtime = "edge";
