import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Optional: Keep GET for easy browser testing
export async function GET() {
  return NextResponse.json({
    message: "API route is live! POST /api/test to use Gemini.",
  });
}

// Your main POST handler
export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // CHANGE THIS LINE TO A CURRENT MODEL
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" }); // or "gemini-2.5-flash"

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text(); // This works reliably now

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
