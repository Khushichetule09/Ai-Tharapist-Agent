import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const API_URL =
    process.env.BACKEND_API_URL ||
    "https://ai-therapist-agent-backend.onrender.com";
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { score, note } = body;

    if (typeof score !== "number" || score < 0 || score > 100) {
      return NextResponse.json(
        { error: "Invalid mood score" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/api/mood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ score, note }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Failed to track mood" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error tracking mood:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
