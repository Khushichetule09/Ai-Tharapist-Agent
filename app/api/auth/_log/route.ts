import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Auth log:", body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging auth event:", error);
    return NextResponse.json(
      { error: "Failed to log auth event" },
      { status: 500 }
    );
  }
}
